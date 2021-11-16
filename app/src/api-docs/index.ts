import BasicInfo from './basicInfo';
import Servers from './servers';
import { JsonObject } from 'swagger-ui-express';
import fetchAll from './FetchAllApiDocs';

export default {
  ...BasicInfo,
  security: [{ bearerAuth: [] as string[] }],
  ...Servers,
  components: {
    schemas: {
      ...fetchAll.schemas(),
    },
  },
  paths: {
    ...fetchAll.paths(),
  },
} as JsonObject;
