import { MigrationInterface, QueryRunner } from 'typeorm';

export class createGoogleContacts1639585689614 implements MigrationInterface {
  name = 'createGoogleContacts1639585689614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fname\` varchar(255) NOT NULL, \`lname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`contacts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contacts\` ADD CONSTRAINT \`FK_30ef77942fc8c05fcb829dcc61d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`contacts\` DROP FOREIGN KEY \`FK_30ef77942fc8c05fcb829dcc61d\``,
    );
    await queryRunner.query(`DROP TABLE \`contacts\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
