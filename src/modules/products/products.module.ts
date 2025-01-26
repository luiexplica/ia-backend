import { Module } from "@nestjs/common";
import { LexiaAssistantModule } from "./lexia-assistant/lexia-assistant.module";
import { GptModule } from "./gpt/gpt.module";

@Module({
  imports: [
    GptModule,
    LexiaAssistantModule
  ]
})
export class ProductsModule { }
