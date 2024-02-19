import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  profile_image?: string;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  time_zone?: string;

  @Field()
  email: string;
}