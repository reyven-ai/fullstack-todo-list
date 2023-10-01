export interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export interface Todo {
  id: string;
  todo_id: string;
  title: string;
  description: string;
  deadline: string;
}

export interface UpdateFormProps {
  todo: Todo;
  onUpdate: (id: string, updatedTodo: Partial<Todo>) => void;
  onClose: () => void;
}

export type InputProps = {
  onClose: () => void;
};
