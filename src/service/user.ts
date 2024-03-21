import { and, eq, isNull } from "drizzle-orm";
import { user, type InsertUser, type User } from "../model/user";
import { database } from "../utils/db";

class UserService {
  public async findByExternalId(externalId: string): Promise<User | undefined> {
    const databaseUser = await database.query.user.findFirst({
      where: and(eq(user.externalId, externalId), isNull(user.deletedAt)),
    });

    if (!databaseUser) {
      return;
    }

    return databaseUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const databaseUser = await database.query.user.findFirst({
      where: and(eq(user.id, id), isNull(user.deletedAt)),
    });

    if (!databaseUser) {
      return;
    }

    return databaseUser;
  }

  async findOrCreateByExternalId(
    externalId: string,
    payload: InsertUser,
  ): Promise<User> {
    const existingUser: User | undefined =
      await this.findByExternalId(externalId);

    if (existingUser) {
      return existingUser;
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
