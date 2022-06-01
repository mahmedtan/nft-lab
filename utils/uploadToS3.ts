import axios from "axios";
import { PRESIGN_API_BASEURL } from "utils/constants";

export async function uploadToS3(file: File, filePath: string) {
  const presignedPostUrl = await getPresignedPostUrl(file.type, filePath);

  const formData = new FormData();
  formData.append("Content-Type", file.type);
  Object.entries(presignedPostUrl.fields).forEach(([k, v]) => {
    formData.append(k, v);
  });

  formData.append("file", file); // The file has be the last element

  const response = await axios.post(presignedPostUrl.url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return presignedPostUrl.filePath;
}

type PresignedPostUrlResponse = {
  url: string;
  fields: {
    key: string;
    acl: string;
    bucket: string;
  };
  filePath: string;
};

export async function getPresignedPostUrl(fileType: string, filePath: string) {
  const { data: presignedPostUrl } = await axios.get<PresignedPostUrlResponse>(
    `${PRESIGN_API_BASEURL}/get-presigned-url-s3?fileType=${fileType}&filePath=${filePath}`
  );

  return presignedPostUrl;
}
