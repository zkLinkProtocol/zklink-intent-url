import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Creator } from 'src/entities/creator.entity';
import { CreatorRepository } from 'src/repositories/creator.repository';
import { BusinessException } from 'src/exception/business.exception';
import { sign_message } from 'src/constants';

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

  async register(
    publicId,
    publickey: string,
    passkeySignature: string,
    address: string,
    privatekeySignature: string,
  ) {
    const validatePasskeyStatus = await this.validatePasskey(
      publickey,
      publicId,
      passkeySignature,
    );
    const validatePrivatekeyStatus = await this.validatePrivatekey(
      address,
      this.signMessage,
      privatekeySignature,
    );
    if (!validatePasskeyStatus || !validatePrivatekeyStatus) {
      throw new BusinessException('Invalid publickey');
    }

    const creatorExist =
      await this.creatorRepository.findByPublicKey(publickey);
    if (creatorExist) {
      throw new BusinessException('Creator already exist');
    }
    const creator = {
      publicid: publicId,
      publickey: publickey,
      address: address,
      status: 'active',
    } as Creator;

    await this.creatorRepository.add(creator);

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

  async login(publicid: string, signature: string, type: string) {
    const creator = await this.creatorRepository.findByPublicId(publicid);
    if (!creator) {
      throw new BusinessException('Creator not exist');
    }
    const publickey = creator.publickey;
    let validateStatus = false;
    const message = this.signMessage;
    if (type === 'passkey') {
      validateStatus = await this.validatePasskey(
        publickey,
        message,
        signature,
      );
      if (!validateStatus) {
        throw new BusinessException('Invalid id');
      }
    } else {
      validateStatus = await this.validatePrivatekey(
        publickey,
        message,
        signature,
      );
      if (!validateStatus) {
        throw new BusinessException('Invalid address');
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

  async validateCreator(payload: any): Promise<any> {
    const user = await this.creatorRepository.findByPublicKey(
      payload?.publickey ?? '',
    );
    if (!user) {
      throw new BusinessException('Invalid token');
    }
    return user;
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
