import { PrismaClient, Prisma } from "@prisma/client";
import { TempoHandler } from "@core/helpers/TempoHandler";

export async function AutoDateMiddleware(prisma: PrismaClient): Promise<Prisma.Middleware> {

  return async (params, next) => {
    const model = params.model;

    const schema = Prisma.dmmf.datamodel.models.find((m) => m.name === model);
    if (!schema) return next(params);

    const date_now = new TempoHandler().date_now();

    if (params.action === 'create') {

      const hasCreatedAtField = schema.fields.some(
        (field) => field.name === 'created_at' && field.type === 'DateTime'
      );

      if (hasCreatedAtField) {
        if (!params.args.data) {
          params.args.data = {};
        }
        if (!params.args.data.created_at) {
          params.args.data.created_at = date_now
        }
      }

    }
    if (params.action === 'createMany') {

      const hasCreatedAtField = schema.fields.some(
        (field) => field.name === 'created_at' && field.type === 'DateTime'
      );

      if (hasCreatedAtField) {
        if (!params.args.data) {
          params.args.data = {};
        }
        if (!params.args.data.created_at) {
          params.args.data.created_at = date_now
        }
      }
    }
    if (params.action === 'update' || params.action === 'upsert') {

      const hasUpdatedAtField = schema.fields.some(
        (field) => field.name === 'updated_at' && field.type === 'DateTime'
      );

      if (hasUpdatedAtField) {
        if (!params.args.data) {
          params.args.data = {};
        }
        if (!params.args.data.updated_at) {
          params.args.data.updated_at = date_now
          console.log('params.args.data.updated_at', params.args.data.updated_at);
        }
      }

    }
    if (params.action === 'updateMany') {

      const hasUpdatedAtField = schema.fields.some(
        (field) => field.name === 'updated_at' && field.type === 'DateTime'
      );

      if (hasUpdatedAtField) {
        if (!params.args.data) {
          params.args.data = {};
        }
        if (!params.args.data.updated_at) {
          params.args.data.updated_at = date_now
        }
      }
    }
    return next(params);
  }

}