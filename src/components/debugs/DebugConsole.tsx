import { useState, useEffect, useRef } from 'react';

interface LogEntry {
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: Date;
}

export function DebugConsole() {
  // 本番環境ではコンポーネントを表示しない
  if (import.meta.env.PROD) return null;

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
    };

    // コンソールメソッドをオーバーライド
    console.log = (...args: any[]) => {
      originalConsole.log(...args);
      addLog('log', args);
    };

    console.error = (...args: any[]) => {
      originalConsole.error(...args);
      addLog('error', args);
    };

    console.warn = (...args: any[]) => {
      originalConsole.warn(...args);
      addLog('warn', args);
    };

    console.info = (...args: any[]) => {
      originalConsole.info(...args);
      addLog('info', args);
    };

    // クリーンアップ関数
    return () => {
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;
    };
  }, []);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (type: 'log' | 'error' | 'warn' | 'info', args: any[]) => {
    const message = args
      .map((arg) => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg);
          } catch (e) {
            return String(arg);
          }
        }
        return String(arg);
      })
      .join(' ');

    setLogs((prevLogs) => [
      ...prevLogs,
      { type, message, timestamp: new Date() },
    ]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* デバッグコンソールトグルボタン */}
      <button
        onClick={toggleVisibility}
        className='fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full z-50 w-10 h-10 flex items-center justify-center'
        style={{ opacity: 0.7 }}
      >
        {isVisible ? 'X' : 'D'}
      </button>

      {/* デバッグコンソール */}
      {isVisible && (
        <div
          className='fixed bottom-16 right-4 w-[90vw] max-w-md h-[50vh] bg-gray-900 text-white rounded-md overflow-hidden z-50 opacity-90 flex flex-col'
          style={{ maxHeight: '60vh' }}
        >
          <div className='flex justify-between items-center p-2 bg-gray-800'>
            <h3 className='text-sm font-bold'>デバッグコンソール</h3>
            <button
              onClick={clearLogs}
              className='text-xs bg-red-600 px-2 py-1 rounded'
            >
              クリア
            </button>
          </div>
          <div
            ref={consoleRef}
            className='flex-1 overflow-y-auto p-2 text-xs font-mono'
          >
            {logs.map((log, index) => (
              <div
                key={index}
                className={`mb-1 ${
                  log.type === 'error'
                    ? 'text-red-400'
                    : log.type === 'warn'
                      ? 'text-yellow-400'
                      : log.type === 'info'
                        ? 'text-blue-400'
                        : 'text-green-400'
                }`}
              >
                <span className='text-gray-400 mr-1'>
                  {log.timestamp.toLocaleTimeString()}:
                </span>
                {log.message}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
