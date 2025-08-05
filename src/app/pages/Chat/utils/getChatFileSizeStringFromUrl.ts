import { request } from 'app/api/chat/request';
import { createGetSizeStringFromUrl } from 'app/utils/getSizeStringFromUrl';

const instance = request();

instance.defaults.withCredentials = true;

const getChatFileSizeStringFromUrl = createGetSizeStringFromUrl(instance);

export default getChatFileSizeStringFromUrl;
