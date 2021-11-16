import BasicInfo from './basicInfo';
import Servers from './servers';
import { JsonObject } from 'swagger-ui-express';

// services
import DocumentApi from '../services/document/document.api-docs';

export default {
  ...BasicInfo,
  security: [{ bearerAuth: [] as string[] }],
  ...Servers,
  components: {
    schemas: {
      ...DocumentApi.schemas,
    },
  },
  paths: {
    ...DocumentApi.paths,
  },
} as JsonObject;
