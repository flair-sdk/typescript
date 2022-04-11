import axios from "axios";
import { Environment, useCancel } from "@0xflair/react-common";
import { useCallback, useEffect, useState } from "react";

import {
  IpfsUploadResult,
} from "../types";
import { FLAIR_IPFS_BACKEND } from "../constants";

async function ipfsUploadFiles(env: Environment, files: File[]) {
  const formData = new FormData();

  files.forEach((file) => formData.append("files[]", file));

  return axios
    .post<any, { data: IpfsUploadResult[] }>(
      `${FLAIR_IPFS_BACKEND[env]}/v1/ipfs/upload/files`,
      formData
    )
    .then((res) => {
      return res.data;
    });
}

type State = {
  ipfsUrl?: string;
  error?: Error;
  loading?: boolean;
};

const initialState: State = {
  loading: false,
};

export function useIpfsFileUploader(options: {
  env?: Environment;
  autoUpload?: boolean;
  fromFile?: File;
}) {
  const { env = Environment.PROD, autoUpload, fromFile } = options;

  const [state, setState] = useState<State>(initialState);

  const cancelQuery = useCancel();
  const uploadToIpfs = useCallback(async () => {
    let didCancel = false;
    cancelQuery(() => {
      didCancel = true;
    });

    if (!fromFile) {
      if (!didCancel) {
        setState({
          error: new Error(`Must provide "File" to useIpfsFileUploader hook`),
          loading: false,
        });
      }
      return;
    }

    try {
      setState({
        loading: true,
      });

      const result = await ipfsUploadFiles(env, [fromFile]);
      const ipfsUrl = `ipfs://${result[0].ipfsHash}`;

      if (!didCancel) {
        setState({ ipfsUrl, loading: false });
      }
    } catch (error) {
      if (!didCancel) {
        setState({ error: error as Error, loading: false });
      }
    }
  }, [cancelQuery, fromFile]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (autoUpload) {
      uploadToIpfs();
    }
  }, [autoUpload, fromFile]);

  return [
    {
      data: state.ipfsUrl,
      error: state.error,
      loading: state.loading,
    },
    uploadToIpfs,
  ] as const;
}