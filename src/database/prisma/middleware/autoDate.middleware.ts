// import { Prisma } from "@prisma/client";
// import { TempoHandler } from "@core/helpers/TempoHandler";

// export const AutoDateMiddleware = async (params: Prisma.MiddlewareParams, next: Prisma.MiddlewareParams): Promise<Prisma.Middleware> => {
//   if (['create', 'update', 'upsert'].includes(params.action)) {
//     if (params.args.data) {
//       const date = new TempoHandler().date_now();
//       if (params.action === 'create' && params.args.data.created_at === undefined) {
//         if (params.args.data?.created_at) params.args.data.created_at = date
//         if (params.args.data?.updated_at) params.args.data.updated_at = date
//       }
//       if (['create', 'update', 'upsert'].includes(params.action)) {
//         if (params.args.data?.updated_at) params.args.data.updated_at = date
//       }
//     }
//   }
//   return next(params);
// }