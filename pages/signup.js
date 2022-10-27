import React from "react";
import { Button, Input, Spacer, useInput } from "@nextui-org/react";
import { Text } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

function Signup() {
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

  async function createUser(email, password) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }

    return data;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateEmail(value);
    if (!isValid) return;
    try {
      const result = await createUser(value, password);
      toast.success(result.message);

      // set some auth state
      router.push("/signin");
    } catch (error) {
      toast.error(error.message);
    }
  };

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
        <Text h3>Sign up</Text>
      </div>
      <Spacer y={2} />
      <form onSubmit={handleSubmit}>
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
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
