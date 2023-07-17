/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/users/userSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hook";
import { useEffect } from "react";
import { ICredential } from "../Interfaces/globalTypes";

const Login = () => {
  const dispatch: any = useDispatch();

  const { user } = useAppSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, [user.email]);

  const onFinish = (values: ICredential) => {
    const { email, password } = values;
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <div className="w-4/12 border border-blue-400 p-10 rounded shadow-lg shadow-blue-500/50">
        <h1 className="my-5 text-center text-2xl font-bold text-blue-400">
          Books Center
        </h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              className="block m-auto bg-blue-500 border border-white hover:bg-white hover:border  font-bold border-0 text-white hover:text-white"
            >
              Log In
            </Button>
            <br />
            <br />
            Or{" "}
            <Link to="/signup" className="text-blue-500">
              register now!
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
