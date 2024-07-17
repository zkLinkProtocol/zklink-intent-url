import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { sign_message } from 'src/constants';
import { Creator } from 'src/entities/creator.entity';
import { BusinessException } from 'src/exception/business.exception';
import { CreatorRepository } from 'src/repositories/creator.repository';

@Injectable()
export class AuthService {
  private readonly logger: Logger;
  private readonly signMessage: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly creatorRepository: CreatorRepository,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger(AuthService.name);
    this.signMessage = sign_message;
  }

  async loginByPasskey(publicId: string, signature: string) {
    const message = this.signMessage;
    const publickey = await this.getPublicKey(publicId);
    const validateStatus = await this.validatePasskey(
      publickey,
      message,
      signature,
    );
    if (!validateStatus) {
      throw new BusinessException('Invalid id');
    }

    const creator = await this.creatorRepository.findByPublicId(publicId);
    if (!creator) {
      const creator = {
        publicid: publicId,
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

  async loginByAddress(address: string, signature: string) {
    const message = this.signMessage;
    const validateStatus = await this.validatePrivatekey(
      address,
      message,
      signature,
    );
    if (!validateStatus) {
      throw new BusinessException('Invalid address');
    }

    const creator = await this.creatorRepository.findByAddress(address);
    if (!creator) {
      const creator = {
        address: address,
        status: 'active',
      } as Creator;

      try {
        await this.creatorRepository.add(creator);
      } catch (err) {
        throw new BusinessException('Create creator failed');
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
    return true;
  }
}
