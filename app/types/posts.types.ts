interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  redirect: () => void;
}
interface LoginPayload {
  email: string;
  password: string;
  redirect: () => void;
}
interface CreatePayload {
  userId: string;
  title: string;
  content: string;
  username: string;
  redirect: () => void;
}
interface EditPayload {
  postId: string;
  title?: string;
  content?: string;
  redirect: () => void;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  username: string;
  updatedAt: string;
}
