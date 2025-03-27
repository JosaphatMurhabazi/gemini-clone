import { createContext, useState } from 'react';
import run from '../config/gemini';

interface ContextType {
  prevPrompts: string[];
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  recentPrompt: string;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;

  onSent: (prompt?: string) => Promise<void>;
  newChat: () => void;

  showResult: boolean;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  resultData: string;
  setResultData: React.Dispatch<React.SetStateAction<string>>;
}

export const Context = createContext<ContextType>({} as ContextType);

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

  const dealyPara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt?: string) => {
    try {
      setResultData('');
      setLoading(true);
      setShowResult(true);
      let response = '';
      if (prompt !== undefined) {
        response = await run(prompt);
        setRecentPrompt(prompt);
      } else {
        setPrevPrompts([...prevPrompts, input]);
        setRecentPrompt(input);
        response = await run(input);
      }
      const responses = response.split('**');
      let newResponse = '';
      for (let i = 0; i < responses.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responses[i];
        } else {
          newResponse += '<b>' + responses[i] + '</b>';
        }
      }

      const newResponse2 = newResponse.split('*').join('<br/>');
      const newResponseArray = newResponse2.split(' ');
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        dealyPara(i, nextWord + ' ');
      }

      setPrevPrompts([...prevPrompts, input]);
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
    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
