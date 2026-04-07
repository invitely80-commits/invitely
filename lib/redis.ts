import { Redis } from "@upstash/redis";

/**
 * Global Redis client for Upstash.
 * Uses REST internally, which is perfect for serverless/edge functions.
 */
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Cache utility for invitation data.
 * Standardizes the key format and JSON handling.
 */
export const inviteCache = {
  key: (slug: string) => `invite:${slug}`,
  
  /**
   * Set cache with a 10-minute TTL (600s)
   */
  async set(slug: string, data: unknown) {
    try {
      await redis.set(this.key(slug), JSON.stringify(data), {
        ex: 600,
      });
    } catch (error) {
      console.warn("[Redis] Failed to set cache:", error);
    }
  },

  async get(slug: string) {
    try {
      const data = await redis.get<string>(this.key(slug));
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.warn("[Redis] Failed to get cache:", error);
      return null;
    }
  },

  async delete(slug: string) {
    try {
      await redis.del(this.key(slug));
    } catch (error) {
      console.warn("[Redis] Failed to delete cache:", error);
    }
  },
};
