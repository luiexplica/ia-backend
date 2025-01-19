import { Prisma, PrismaClient } from '@prisma/client';

export async function DeleteOrphansOneToOneMiddleware(prisma: PrismaClient): Promise<Prisma.Middleware> {

  return async (params, next) => {

    if (params.action === 'delete' || params.action === 'deleteMany') {
      // Check if the action is a delete
      // Get the model being affected
      const model = params.model;

      // Get the schema information
      const schema = Prisma.dmmf.datamodel.models.find((m) => m.name === model);
      if (!schema) return next(params);

      // Find fields with one-to-one relationships where this model is the owner
      const oneToOneRelations = schema.fields.filter(
        (field) =>
          field.relationName && // Has a relation
          field.isRequired && // Owner of the relationship (not nullable foreign key)
          !field.isList // Ensures it's one-to-one, not one-to-many
      );

      // console.log('oneToOneRelations', oneToOneRelations);

      if (oneToOneRelations.length > 0) {
        // Fetch the ID of the record being deleted
        const recordBeingDeleted = await (prisma[model] as any).findUnique({
          where: params.args.where,
        });

        // console.log('recordBeingDeleted', recordBeingDeleted);

        if (recordBeingDeleted) {
          for (const relation of oneToOneRelations) {

            const relatedModel = relation.type; // Related model name
            const foreignKeyField = relation.relationToFields[0]; // The foreign key in the related model
            const recordBeingDeleted_Rel = relation.relationFromFields[0]; // The foreign key in the related model
            // Delete the related record

            // console.log('relatedModel', relatedModel);
            // console.log('foreignKeyField', foreignKeyField);
            // console.log('recordBeingDeleted_Rel', recordBeingDeleted_Rel);
            // console.log('recordBeingDeleted[recordBeingDeleted_Rel]', recordBeingDeleted[recordBeingDeleted_Rel]);

            // const _x = await (prisma[relatedModel] as any).findUnique({
            //   where: {
            //     [foreignKeyField]: recordBeingDeleted[recordBeingDeleted_Rel]
            //   },
            // });
            setTimeout(async () => {
              await (prisma[relatedModel] as any).delete({
                where: {
                  [foreignKeyField]: recordBeingDeleted[recordBeingDeleted_Rel],
                },
              });
            }, 10);

          }
        }
      }
    };
    return next(params);
  }

}
