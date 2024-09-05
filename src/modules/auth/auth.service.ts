import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TSignedRequest } from '@turnkey/sdk-server';
import { verifyMessage } from 'ethers';

import { ConfigType } from 'src/config';
import { Creator } from 'src/entities/creator.entity';
import { BusinessException } from 'src/exception/business.exception';
import { CreatorRepository } from 'src/repositories/creator.repository';

@Injectable()
export class AuthService {
  private readonly logger: Logger;
  constructor(
    private readonly jwtService: JwtService,
    private readonly creatorRepository: CreatorRepository,
    private readonly configService: ConfigService<ConfigType>,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async getTurnKeyInfo(params: TSignedRequest) {
    const response = await fetch(params.url, {
      method: 'post',
      headers: {
        [params.stamp.stampHeaderName]: params.stamp.stampHeaderValue,
      },
      body: JSON.stringify(params.body),
    });
    const { data, status } = await response.json();
    if (status != 200) {
      throw new BusinessException('Internal Error');
    }

    const turnKeyInfo = await this.checkTurnkey(data.organizationId);
    return turnKeyInfo;
  }

  async checkTurnkey(subOrgId: string) {
    const turnkeyApi = this.configService.get('turnkeyApi', { infer: true })!;
    const resp = await fetch(
      `${turnkeyApi}/deposit/checkTurnkey?subOrgId=${subOrgId}`,
      {
        method: 'GET',
      },
    );
    const result: {
      address: string;
      subOrgId: string;
      turnkeyAccount: string;
      userAA: string;
    } = await resp.json();

    return result; // TODO
    // return this.contractService.checkTurnkeyBind(result.address);
  }

  async loginByAddress(address: string, message: string, signature: string) {
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
      } as Creator;

      try {
        await this.creatorRepository.add(creator);
      } catch (err) {
        throw new BusinessException('Create creator failed');
      }
    }

    return this.signJwtToken(address);
  }

  public signJwtToken(address: string) {
    const payload = { address: address };
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
    const user = await this.creatorRepository.findByAddress(payload.address);
    if (!user) {
      throw new BusinessException('Invalid token');
    }
    return user;
  }

  async validatePasskey(
    address: string,
    message: string,
    signature: string,
  ): Promise<boolean> {
    this.logger.log(`validatePasskey: ${address} ${message} ${signature}`);
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
