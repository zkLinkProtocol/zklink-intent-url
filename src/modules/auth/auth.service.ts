import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TSignedRequest } from '@turnkey/sdk-server';
import { verifyMessage } from 'ethers';

import { ConfigType } from 'src/config';
import { Creator, CreatorStatus } from 'src/entities/creator.entity';
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
      body: params.body,
    });
    const res = await response.json();

    if (!response.ok) {
      throw new BusinessException(res.message);
    }

    const turnKeyInfo = await this.checkTurnkey(res.activity.organizationId);

    if (!turnKeyInfo) {
      throw new BusinessException(
        `turnKeyInfo not found with organizationId: ${res.activity.organizationId}`,
      );
    }

    return turnKeyInfo;
  }

  async checkTurnkey(subOrgId: string) {
    const turnkeyApi = this.configService.get('turnkeyApi', { infer: true })!;
    const response = await fetch(
      `${turnkeyApi}/deposit/checkTurnkey?subOrgId=${subOrgId}`,
      {
        method: 'GET',
      },
    );
    if (!response.ok) {
      throw new BusinessException(
        `Contract binding information query failed with subOrgId: ${subOrgId}`,
      );
    }
    const { result } = await response.json();

    return result;
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

    await this.updateCreator(address, tgUserId, tgUserName);

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

  public async updateCreator(
    address: string,
    tgUserId?: string,
    tgUserName?: string,
  ) {
    const creator = await this.creatorRepository.findByAddress(address);
    if (!creator) {
      const creator =
        tgUserId != ''
          ? ({
              address: address,
              status: CreatorStatus.ACTIVE,
              tgUserId: tgUserId,
              tgUserName: tgUserName,
            } as Creator)
          : ({
              address: address,
              status: CreatorStatus.ACTIVE,
            } as Creator);
      try {
        await this.creatorRepository.add(creator);
      } catch (err) {
        throw new BusinessException(`create creator ${address} failed`);
      }
    } else {
      if (tgUserName && tgUserId) {
        if ('' == creator.tgUserId || null == creator.tgUserId) {
          creator.tgUserId = tgUserId ?? '';
        }
        creator.tgUserName = tgUserName ?? '';
        await this.creatorRepository.update(creator, { id: creator.id });
      }
    }
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
