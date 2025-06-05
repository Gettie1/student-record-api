import { Inject, Injectable } from '@nestjs/common';
import { CreateCacheMeDto } from './dto/create-cache-me.dto';
// import { UpdateCacheMeDto } from './dto/update-cache-me.dto';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CacheMeService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async create(createCacheMeDto: CreateCacheMeDto) {
    const { key, value, ttl } = createCacheMeDto;
    try {
      if (ttl) {
        await this.cacheManager.set(key, value, ttl * 1000); // Convert seconds to milliseconds
      } else {
        await this.cacheManager.set(key, value);
      }
      return {
        success: true,
        message: `Cache created successfully for key ${key}`,
        data: {
          key: key,
          value: value,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Error creating cache for key ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }

  async get(key: string) {
    try {
      const value = await this.cacheManager.get(key);
      if (value === undefined || value === null) {
        return {
          success: false,
          message: `Cache for key ${key} not found`,
          data: null,
        };
      }
      return {
        success: true,
        message: `Cache retrieved successfully for key ${key}`,
        data: {
          key: key,
          value: value,
        },
      };
    } catch (error) {
      throw new Error(
        `Error retrieving cache for key ${JSON.stringify(error)}`,
      );
    }
  }

  async remove(key: string) {
    try {
      await this.cacheManager.del(key);
      return {
        success: true,
        message: `Cache for key '${key}' removed successfully`,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: `Error removing cache for key ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }
}

// function remove(key: any, string: any) {
//   throw new Error('Function not implemented.');
// }
// // The remove method is already implemented as an async method in the class above.
// If you want to provide a standalone function (not as a class method), it could look like this
