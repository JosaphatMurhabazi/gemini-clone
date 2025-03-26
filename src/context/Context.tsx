import { createContext, useState } from 'react';
import run from '../config/gemini';

export const Context = createContext(null);

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [input, setInput] = useState('');
  const [recentPrompt, setRecentPrompt] = useState('');
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [resultData, setResultData] = useState('');

  const onSent = async () => {
    try {
      setResultData('');
      setLoading(true);
      setShowResult(true);
      setRecentPrompt(input);
      const response = await run(input);
      setResultData(response);
      setPrevPrompts([...prevPrompts, input]);
      setLoading(false);
      setInput('');
    } catch (error) {
      console.error('Error :', error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    isLoading,
    setLoading,
    resultData,
    setResultData,
    input,
    setInput,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
