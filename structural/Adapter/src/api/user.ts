export const getUserData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!response.ok) {
    throw new Error("네트워크 오류 또는 서버 오류 발생");
  }
  return response.json();
};
