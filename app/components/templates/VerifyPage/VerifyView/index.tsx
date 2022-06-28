import {
  ChangeEvent,
  ClipboardEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef, useState
} from "react";
import Input from "../../../common/Input";
import Button from "../../../common/Button";
import Axios from "../../../../lib/axios";
import Alert from "../../../common/Alert";
import { useRouter } from "next/router";
import { VerificationType } from "../../../../types/common";

interface VerifyViewProps {
  type: VerificationType;
  secret?: string;
  onClose: () => void;
}

const VerifyView: FC<VerifyViewProps> = ({ type, secret, onClose }) => {
  const router = useRouter();
  const inputs = useRef<HTMLInputElement[]>([]);
  const formRef = useRef(null);
  useEffect(() => {
    inputs.current = inputs.current.slice(0, 6);
  }, []);
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input.nextElementSibling && input.value) {
      if (input.nextElementSibling instanceof HTMLInputElement) {
        input.nextElementSibling.focus();
        input.nextElementSibling.select();
      }
    }
  };
  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const paste = event.clipboardData.getData("text");
    [...Array(6)].map((element, i) => {
      inputs.current[i].value = paste[i] || "";
    });
  };
  const handleBack = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (index > 0 && event.key == "Backspace") {
      inputs.current[index].value = "";
      inputs.current[index - 1].focus();
    }
  };
  const [pinCode, setPinCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const onChangeForm = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current),
        formDataObj = Object.fromEntries(formData.entries());
      let code = "";
      [...Array(6)].forEach((item, index) => {
        code += formDataObj[`pin${index}`] ?? "";
      });
      setPinCode(code);
    }
  };
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    Axios.post("/auth/verify-code", {
      type: type,
      secret,
      code: pinCode,
      email: !!router.query.email
    }).then(async ({ data }) => {
      setLoading(false);
      if (data.success) {
        await router.replace("/");
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
      {error &&
        <Alert variant="error" className="mt-5">
          <div className="px-4 py-3">
            {error}
          </div>
        </Alert>
      }
      <form ref={formRef} onChange={onChangeForm} onSubmit={onSubmit}>
        <div className="py-6 px-6 w-96 border mx-auto text-center mt-9">
          <div className="flex justify-between">
            {[...Array(6)].map((item, index) => (
              <Input
                key={index}
                ref={(ref) => {
                  if (ref) {
                    inputs.current[index] = ref;
                  }
                }}
                type="tel"
                name={`pin${index}`}
                maxLength={1}
                className="border border-gray-500 w-12 h-12 text-center text-xl font-bold"
                onInput={handleInput}
                onPaste={handlePaste}
                onKeyDown={(event) => handleBack(event, index)}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-9">
          <Button
            variant="primary"
            className="w-40 bg-gray-700"
            onClick={onClose}
          >
            Back
          </Button>
          <Button
            variant="primary"
            className="w-40"
            disabled={pinCode.length != 6 || loading}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default VerifyView;
