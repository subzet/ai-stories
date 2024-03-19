import { and, eq, isNull, like } from "drizzle-orm";
import { user, type InsertUser, type User } from "../model/user";
import { database } from "../utils/db";

class UserService {
  public findByExternalId(externalId: string): Promise<User | undefined> {
    return database.query.user.findFirst({
      where: and(eq(user.externalId, externalId), isNull(user.deletedAt)),
    });
  }

  async findOrCreateByExternalId(externalId: string, payload: InsertUser) {
    const existingUser = await this.findByExternalId(externalId);

    if (existingUser) {
      return user;
    }

    const newUser = await database
      .insert(user)
      .values({ ...payload, externalId })
      .returning()
      .get();

    return newUser;
  }
}

export const userService = new UserService();
