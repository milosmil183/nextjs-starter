import { FC, useState } from "react";
import Card from "../../../common/Card";
import Button from "../../../common/Button";
import { signIn } from "next-auth/react";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;

const Veteran: FC = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="px-3">
        <Card className="max-w-lg mx-auto mt-10 shadow-sm py-10">
          <div className="text-xl text-center font-medium opacity-60">
            Veteran Application
          </div>
          <div className="text-2xl text-center font-bold mt-3">
            Login
          </div>
          <div className="mt-24 mb-8">
            <Button
              type="submit"
              variant="primary"
              className="w-full uppercase"
              loading={loading}
              disabled={loading}
              onClick={() => {
                setLoading(true);
                signIn("veteran")
                  .then((response) => {
                    console.log("response", response);
                  })
                  .catch((error) => {
                    console.log("error", error);
                  });
              }}
            >
              Log in with Veteran
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Veteran;