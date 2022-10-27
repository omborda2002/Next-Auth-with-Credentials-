import React from "react";
import { Button, Input, Spacer, useInput } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
function Login() {
  const router = useRouter();
  const { value, reset, bindings } = useInput("");
  const {
    value: password,
    reset: password_reset,
    bindings: bindings_password,
  } = useInput("");

  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const helper = React.useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(value);
    return {
      text: isValid ? "Correct email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [value]);

  async function submitHandler(event) {
    event.preventDefault();
    const isValid = validateEmail(value);
    if (!isValid) return;

    const result = await signIn("credentials", {
      redirect: false,
      email: value,
      password: password,
      // callbackUrl: `${window.location.origin}/data`,
    });

    if (!result?.error) {
      router.push("/data");
      toast.success("Logged in successfully!");
    } else {
      toast.error(result.error);
    }
  }

  return (
    <div style={{ padding: 100 }}>
      <div style={{ display: "flex" }}>
        <Link href="/">
          <Button
            auto
            color="primary"
            icon={<IoIosArrowBack style={{ width: 20, height: 20 }} />}
          />
        </Link>
        <Spacer x={1} />
        <Text h3>Sign in</Text>
      </div>
      <Spacer y={2} />
      <form onSubmit={submitHandler}>
        <div style={{ display: "flex" }}>
          <Input
            {...bindings}
            clearable
            shadow={false}
            onClearClick={reset}
            status={helper.color}
            color={helper.color}
            helperColor={helper.color}
            helperText={helper.text}
            type="email"
            labelPlaceholder="Email"
            placeholder="Enter @"
          />
          <Spacer x={2} />
          <Input
            {...bindings_password}
            clearable
            shadow={false}
            onClearClick={reset}
            color="primary"
            type="password"
            labelPlaceholder="Password"
            placeholder="xxx"
          />
          <Spacer x={2} />
          <Button shadow color="primary" auto type="submit">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
