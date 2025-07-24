import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1753400459601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE user (
            id INT NOT NULL AUTO_INCREMENT,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(100),
            CONSTRAINT PK_user PRIMARY KEY (id),
            CONSTRAINT UK_user_email UNIQUE (email)
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user;`);
    }

}
