import { create } from 'zustand';
import run from './config/gemini';

interface State {
  prevPrompts: string[];
  recentPrompt: string;
  input: string;
  showResult: boolean;
  isLoading: boolean;
  resultData: string;

  setPrevPrompts: (prompts: string[]) => void;
  setRecentPrompt: (prompt: string) => void;
  setInput: (input: string) => void;
  setShowResult: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  setResultData: (data: string) => void;
  newChat: () => void;
  onSent: (prompt?: string) => Promise<void>;
}

const store = create<State>((set, get) => ({
  prevPrompts: [],
  recentPrompt: '',
  input: '',
  showResult: false,
  isLoading: false,
  resultData: '',

  setPrevPrompts: (prompts) => set({ prevPrompts: prompts }),
  setRecentPrompt: (prompt) => set({ recentPrompt: prompt }),
  setInput: (input) => set({ input }),
  setShowResult: (show) => set({ showResult: show }),
  setLoading: (loading) => set({ isLoading: loading }),
  setResultData: (data) => set({ resultData: data }),

  newChat: () => set({ isLoading: false, showResult: false }),

  onSent: async (prompt) => {
    const {
      input,
      setResultData,
      setLoading,
      setShowResult,
      setPrevPrompts,
      setRecentPrompt,
      prevPrompts,
    } = get();

    try {
      setResultData('');
      setLoading(true);
      setShowResult(true);

      let response = '';
      if (prompt) {
        response = await run(prompt);
        setRecentPrompt(prompt);
      } else {
        setPrevPrompts([...prevPrompts, input]);
        setRecentPrompt(input);
        response = await run(input);
      }

      const responses = response.split('**');
      let formattedResponse = '';
      for (let i = 0; i < responses.length; i++) {
        formattedResponse +=
          i % 2 === 1 ? `<b>${responses[i]}</b>` : responses[i];
      }

      const newResponse = formattedResponse.split('*').join('<br/>');
      setResultData(newResponse);
      setPrevPrompts([...prevPrompts, input]);
      set({ input: '' });
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  },
}));

export default store;
