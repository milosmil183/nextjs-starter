import { FC, useEffect, useState } from "react";
import Card from "../../common/Card";
import Alert from "../../common/Alert";
import Field from "../../common/Field";
import Button from "../../common/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import "yup-phone";
import { yupResolver } from "@hookform/resolvers/yup";
import VerifyView from "./VerifyView";
import Axios from "../../../lib/axios";
import Image from "next/image";
import { VerificationType } from "../../../types/common";

const schema = yup
  .object({
    phoneNumber: yup
      .string()
      .phone(undefined, false, "Invalid phone number")
      .required("Phone number required")
  })
  .required();

type FormValues = {
  phoneNumber: string;
};

const VerifyPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: "onChange"
  });
  const { isValid } = formState;
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [showVerifyView, setShowVerifyView] = useState(false);
  const [verifyType, setVerifyType] = useState<VerificationType>("sms");
  const [googleCode, setGoogleCode] = useState<Record<string, any>>();
  useEffect(() => {
    Axios.get("/auth/request-google-code").then(({ data }) => {
      if (data.success) {
        setGoogleCode(data.data);
      }
    });
  }, []);
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    Axios.post("/auth/request-sms-code", {
      "type": "sms",
      "source": data.phoneNumber
    }).then(({ data }) => {
      setLoading(false);
      if (data.success) {
        setShowVerifyView(true);
      } else {
        setError(data.message);
      }
    }).catch((e) => {
      setLoading(false);
      setError(e.message);
    });
  };
  return (
    <>
      <div className="px-3">
        <Card className="max-w-lg mx-auto mt-10 shadow-sm py-10">
          <div className="text-xl text-center font-medium opacity-60">
            Veteran Application
          </div>
          <div className="text-2xl text-center font-bold mt-3">
            Two Step Authentication
          </div>
          {error &&
            <Alert variant="error" className="mt-5">
              <div className="px-4 py-3">
                {error}
              </div>
            </Alert>
          }
          {!showVerifyView &&
            <>
              <div>
                <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                  <div className="w-full flex">
                    <Field
                      register={register}
                      state={formState}
                      name="phoneNumber"
                      label="Phone Number"
                      autoComplete="phone"
                      className="flex-grow"
                    />
                    <div className="mt-6">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={!isValid}
                        className="w-32 ml-3"
                        loading={loading}
                      >
                        Send Code
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <div className="flex items-center my-3">
                  <div className="border flex-grow" />
                  <div className="text-gray-500 mx-3">OR</div>
                  <div className="border flex-grow" />
                </div>
                <div className="text-center mt-3">
                  {googleCode &&
                    <>
                      <div className="text-center">
                        <Image
                          src={googleCode.qrcode}
                          width={160}
                          height={160}
                          alt=""
                        />
                      </div>
                    </>
                  }
                  <Button
                    variant="primary"
                    loading={loading}
                    className="w-72"
                    disabled={!googleCode}
                    onClick={() => {
                      setVerifyType("google");
                      setShowVerifyView(true);
                    }}
                  >
                    Continue with Google Authenticator
                  </Button>
                </div>
              </div>
            </>
          }
          {showVerifyView &&
            <>
              <VerifyView
                type={verifyType}
                secret={googleCode?.secret}
                onClose={() => setShowVerifyView(false)}
              />
            </>
          }
        </Card>
      </div>
    </>
  );
};

export default VerifyPage;
