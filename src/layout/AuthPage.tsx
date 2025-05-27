import LogoBox from "../components/LogoBox";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";

function AuthPage({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/table.jpg')` }}
    >
      <div className="w-full max-w-3xl px-4 py-8 flex flex-col items-center">
        {/* Logo */}
        <div
          className="w-full px-4 py-6 mb-6 text-center"
          style={{ backgroundColor: "rgba(195, 175, 166, 0.5)" }}
        >
          <LogoBox />
        </div>
        {/* Forms side by side on md+ screens */}
        <div className="w-full flex flex-col md:flex-row gap-6 justify-center">
          <div
            className="w-full max-w-md p-6"
            style={{ backgroundColor: "rgba(195, 175, 166, 0.5)" }}
          >
            <RegisterForm onRegisterSuccess={onLoginSuccess} />
          </div>
          <div
            className="w-full max-w-md p-6"
            style={{ backgroundColor: "rgba(195, 175, 166, 0.5)" }}
          >
            <LoginForm onLoginSuccess={onLoginSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
