export interface ButtonContainerProps {
  children: React.ReactNode | React.ReactNode[];
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  align?: 'flex-start' | 'center' | 'flex-end' | 'baseline';
}

export interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export interface FormTextProps {
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
  label?: string;
  helperText?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  type?: 'text' | 'password';
}

export interface TitleProps {
  children: string;
}

export interface AppContentProps {
  children?: React.ReactNode;
}
