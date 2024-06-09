import React, { useState } from "react";

interface LoginModalProps {
  handleLogin: (username: string, password: string) => void;
  toggleModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  handleLogin,
  toggleModal,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white bg-opacity-20 w-full h-full absolute top-0 flex items-center justify-center">
        <div className="bg-white rounded-lg overflow-hidden w-[400px]">
          <div className="bg-[#0C364B] rounded-t-lg p-4 flex justify-between">
            <h5 className="text-xl font-bold text-white" id="exampleModalLabel">
              Log In
            </h5>
            <button type="button" className="text-white" onClick={toggleModal}>
              ✕
            </button>
          </div>
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-[#0C364B]">
                <label htmlFor="email-login" className="block text-[#0C364B]">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control w-full p-2 border border-gray-300 rounded-full px-5"
                  id="email-login"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="mb-4 text-[#0C364B]">
                <label
                  htmlFor="password-login"
                  className="block text-[#0C364B]"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control w-full p-2 border border-gray-300 rounded-full px-5"
                  id="password-login"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-[#4B6C7D] text-white font-bold px-4 py-2 rounded-full"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
