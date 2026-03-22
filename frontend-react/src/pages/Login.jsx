const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:8080/api/auth/register", {
      username: regName,
      password: regPassword,
      email: regEmail,
      role: "Customer" // Default role
    });
    alert("User Registered Successfully in MySQL!");
    setMode("login");
  } catch (err) {
    alert("Registration Failed!");
  }
};

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      username: name,
      password: password
    });
    // This saves the REAL data to your App state
    setToken(res.data.token);
    setCurrentUser(res.data.username);
    setIsAdmin(res.data.role === "Admin");
  } catch (err) {
    alert("Invalid Credentials!");
  }
};