import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTipsTable1753400512166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE tip (
            id INT NOT NULL AUTO_INCREMENT,
            description TEXT NOT NULL,
            likes int NOT NULL,
            active boolean,
            showed_in_date DATE,
            CONSTRAINT PK_tip PRIMARY KEY (id)
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE tip;`);
    }

}
