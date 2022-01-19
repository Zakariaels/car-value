import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from 'typeorm';

const log = console.log
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        log('Inserted User with id = ' + this.id);
    }
    @AfterUpdate()
    logUpdate() {
        log('Updated User with id = ' + this.id);
    }
    @AfterRemove()
    logRemove() {
        log('Removed User with id = ' + this.id);
    }
}