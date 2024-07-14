import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Creator } from 'src/entities/creator.entity';
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

  async login(
    publickey: string,
    message: string,
    signature: string,
    type: string,
  ) {
    let validateStatus = false;
    if (type === 'passkey') {
      validateStatus = await this.validatePasskey(
        publickey,
        message,
        signature,
      );
    } else {
      validateStatus = await this.validatePrivatekey(
        publickey,
        message,
        signature,
      );
    }
    if (!validateStatus) {
      throw new Error('Invalid publickey');
    }

    const creatorExist =
      await this.creatorRepository.findByPublicKey(publickey);
    if (!creatorExist) {
      const creator = {
        publickey: type === 'passkey' ? publickey : '',
        address: type === 'privatekey' ? publickey : '',
        status: 'active',
      } as Creator;

      await this.creatorRepository.add(creator);
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
      throw new Error('Invalid token');
    }
    return user;
  }

  async validatePasskey(
    publickey: string,
    message: string,
    signature: string,
  ): Promise<boolean> {
    return true;
  }

  async validatePrivatekey(
    privatekey: string,
    message: string,
    signature: string,
  ): Promise<boolean> {
    return true;
  }
}
