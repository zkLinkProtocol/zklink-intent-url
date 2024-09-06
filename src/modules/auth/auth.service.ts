import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { verifyMessage } from 'ethers';

import { Creator } from 'src/entities/creator.entity';
import { BusinessException } from 'src/exception/business.exception';
import { CreatorRepository } from 'src/repositories/creator.repository';

@Injectable()
export class AuthService {
  private readonly logger: Logger;
  constructor(
    private readonly jwtService: JwtService,
    private readonly creatorRepository: CreatorRepository,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async loginByPasskey(publicId: string, message: string, signature: string) {
    const publickey = await this.getPublicKey(publicId);
    const validateStatus = await this.validatePasskey(
      publickey,
      message,
      signature,
    );
    if (!validateStatus) {
      throw new BusinessException('Invalid signature');
    }

    const creator = await this.creatorRepository.findByPublicId(publicId);
    if (!creator) {
      const creator = {
        publicId: publicId,
        publickey: publickey,
        status: 'active',
      } as Creator;

      try {
        await this.creatorRepository.add(creator);
      } catch (err) {
        throw new BusinessException('Create creator failed');
      }
    }

    const payload = { publickey: publickey };
    const jwt = this.configService.get('jwt');
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: jwt.expirationTime,
        secret: jwt.secret,
      }),
      expiresIn: jwt.expirationTime,
    };
  }

  async loginByAddress(
    address: string,
    message: string,
    signature: string,
    tgUserId: string,
    tgUserName: string,
  ) {
    const validateStatus = await this.validatePrivatekey(
      address,
      message,
      signature,
    );
    if (!validateStatus) {
      throw new BusinessException('Invalid signature');
    }

    const creator = await this.creatorRepository.findByAddress(address);
    if (!creator) {
      const creator = {
        address: address,
        status: 'active',
        tgUserId: tgUserId,
        tgUserName: tgUserName,
      } as Creator;

      try {
        await this.creatorRepository.add(creator);
      } catch (err) {
        throw new BusinessException('Create creator failed');
      }
    } else {
      if (tgUserName != '' && tgUserId != '') {
        if ('' == creator.tgUserId || null == creator.tgUserId) {
          creator.tgUserId = tgUserId;
        }
        creator.tgUserName = tgUserName;
        await this.creatorRepository.update(creator, { id: creator.id });
      }
    }

    const payload = { publickey: address };
    const jwt = this.configService.get('jwt');
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: jwt.expirationTime,
        secret: jwt.secret,
      }),
      expiresIn: jwt.expirationTime,
    };
  }

  async validateCreator(payload: any): Promise<any> {
    const user = await this.creatorRepository.findByPublicKey(
      payload?.publickey ?? '',
    );
    if (!user) {
      throw new BusinessException('Invalid token');
    }
    return user;
  }

  async getPublicKey(publicId: string): Promise<string> {
    return publicId;
  }

  async validatePasskey(
    publickey: string,
    message: string,
    signature: string,
  ): Promise<boolean> {
    this.logger.log(`validatePasskey: ${publickey} ${message} ${signature}`);
    return true;
  }

  async validatePrivatekey(
    address: string,
    message: string,
    signature: string,
  ): Promise<boolean> {
    this.logger.log(`validatePrivatekey: ${address} ${message} ${signature}`);
    try {
      const recoveredAddress = verifyMessage(message, signature);
      return recoveredAddress.toLowerCase() === address.toLowerCase();
    } catch (error) {
      return false;
    }
  }
}
