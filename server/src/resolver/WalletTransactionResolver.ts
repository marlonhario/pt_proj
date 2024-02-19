import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { getConnection, getRepository } from "typeorm";
import { WalletTransactionsSummary } from "./../entity/WalletTransactionsSummary";
import { WalletTransactions } from "./../entity/WalletTransactions";

let response = {
	data: null,
	error: null,
	status_code: 400,
};

@Resolver()
export class WalletTransactionResolver {
	@Query(() => String)
	async getSummary() {
		try {
			response.data = await getRepository(WalletTransactions)
				.createQueryBuilder()
				.orderBy("date", "DESC")
				.getMany();

			response.status_code = 200;
		} catch (err) {
			response.error = err;
			response.status_code = 400;
		}

		return JSON.stringify(response);
	}

	@Mutation(() => String)
	async removeTransactions() {
		const connection = getConnection();
		const queryRunner = connection.createQueryRunner();
		await queryRunner.connect();

		const deleteTransactions = await connection.createQueryBuilder()
			.delete()
			.from(WalletTransactions)
			.execute();

		const deleteSummaries = await connection.createQueryBuilder()
			.delete()
			.from(WalletTransactionsSummary)
			.execute();

		await queryRunner.startTransaction();
		try {
			await queryRunner.manager.save(deleteTransactions);
			await queryRunner.manager.save(deleteSummaries);
			await queryRunner.commitTransaction();
			response.status_code = 200;
		} catch (err) {
			await queryRunner.rollbackTransaction()
			response.status_code = 400;
			response.error = err;
		} finally {
			await queryRunner.release();
		}

		return JSON.stringify(response);
	}

	@Mutation(() => String)
	async addTransactions(
		@Arg("transaction_type") transaction_type: string,
		@Arg("currency_code") currency_code: string,
		@Arg("balance") balance: string,
		@Arg("amount") amount: string,
		@Arg("date") date: string,
		@Arg("name") name: string,
	) {
		const connection = getConnection();
		const queryRunner = connection.createQueryRunner();
		await queryRunner.connect();

		try {
			const ifExist = await getRepository(WalletTransactions)
				.createQueryBuilder()
				.where("balance = :balance", { balance })
				.andWhere("amount = :amount", { amount })
				.andWhere("date = :date", { date })
				.andWhere("name = :name", { name })
				.getOne();

			if (!!!ifExist) {
				let addTransaction = getConnection()
					.createQueryBuilder()
					.insert()
					.into(WalletTransactions)
					.values({
						account_id: "nv7w6a8rMmTpqn4zXzGbfVexll86Xbc69wwq8",
						transaction_type,
						currency_code,
						balance,
						amount,
						date,
						name,
					})
					.execute();

				await queryRunner.startTransaction();

				try {
					response.data = await queryRunner.manager.save(addTransaction);
					await queryRunner.commitTransaction();
					response.status_code = 200;
				} catch (err) {
					await queryRunner.rollbackTransaction()
					response.status_code = 400;
					response.error = err;
				} finally {
					await queryRunner.release();
				}

			}

		} catch (err) {
			response.status_code = 400;
			response.error = err;
		}

		return JSON.stringify(response);
	}


	@Mutation(() => String)
	async addSummary(
		@Arg("currency_code") currency_code: string,
		@Arg("debit") debit: string,
		@Arg("credit") credit: string,
		@Arg("date") date: string,
		@Arg("balance") balance: string,
	) {
		const connection = getConnection();
		const queryRunner = connection.createQueryRunner();
		await queryRunner.connect();

		try {
			const ifExist = await getRepository(WalletTransactionsSummary)
				.createQueryBuilder()
				.where("balance = :balance", { balance })
				.andWhere("debit = :debit", { debit })
				.andWhere("date = :date", { date })
				.andWhere("credit = :credit", { credit })
				.getOne();

			if (!!!ifExist) {
				let addTransaction = getConnection()
					.createQueryBuilder()
					.insert()
					.into(WalletTransactionsSummary)
					.values({
						currency_code,
						balance,
						debit,
						credit,
						date,
					})
					.execute();

				await queryRunner.startTransaction();

				try {
					response.data = await queryRunner.manager.save(addTransaction);
					await queryRunner.commitTransaction();
					response.status_code = 200;
				} catch (err) {
					await queryRunner.rollbackTransaction()
					response.status_code = 400;
					response.error = err;
				} finally {
					await queryRunner.release();
				}

			}

		} catch (err) {
			response.status_code = 400;
			response.error = err;
		}

		return JSON.stringify(response);
	}
}

