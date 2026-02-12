import { useState, useRef, useEffect } from 'react';
import { Cpu, Send, User, Bot, Sparkles, AlertCircle, Trash2, Download } from 'lucide-react';
import type { Message } from '@/types';
import '@/styles/WebLLM.css';

export default function WebLLM() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '你好！我是本地运行的AI助手。由于使用浏览器WebGPU在你的显卡上运行，请不要期待与ChatGPT相当的性能，但可以用来简单玩玩和体验本地AI的魅力！\n\n注意：首次加载模型可能需要一些时间，请耐心等待。',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // 使用消息区域的scrollTop属性实现内部滚动，而不是整个页面滚动
    const messagesArea = document.querySelector('.messages-area');
    if (messagesArea) {
      messagesArea.scrollTop = messagesArea.scrollHeight;
    }
  };

  useEffect(() => {
    // 只有当消息数量大于1时才滚动到底部（避免初始加载时的欢迎消息导致滚动）
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const headerContent = entry.target.querySelector('.header-content');
            if (headerContent) {
              headerContent.classList.add('animate-in');
            }
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) observer.observe(headerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (since we can't actually load a real LLM in this demo)
    setTimeout(() => {
      const responses = [
        '这是一个很有趣的问题！作为七叔的AI助手，我可以告诉你他正在努力学习唱歌，而且进步很快。',
        '七叔喜欢的歌手有杨宗纬、王力宏、张杰和隔壁老樊。他们的风格各异，但都很注重情感表达。',
        '代码开发和唱歌其实有很多共同点，都需要不断练习、注意细节、持续优化。',
        '如果你想学唱歌，建议从基础开始：呼吸练习、音准训练、然后才是歌曲演绎。',
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
      setModelLoaded(true);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: '聊天记录已清空。有什么我可以帮你的吗？',
        timestamp: Date.now(),
      },
    ]);
  };

  const exportChat = () => {
    const chatText = messages
      .map((m) => `${m.role === 'user' ? '你' : 'AI'}: ${m.content}`)
      .join('\n\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="llm-page">
      {/* Header */}
      <div className="llm-header" ref={headerRef}>
        <div className="header-bg">
          <div className="gradient-orb"></div>
        </div>
        <div className="container">
          <div className="header-content">
            <div className="header-badge">
              <Cpu size={18} />
              <span>本地AI</span>
            </div>
            <h1 className="header-title">Web LLM</h1>
            <p className="header-desc">
              在浏览器中使用 WebGPU 运行本地大语言模型，无需服务器，保护隐私
            </p>
            
            {/* Status */}
            <div className={`model-status ${modelLoaded ? 'loaded' : ''}`}>
              <Sparkles size={16} />
              <span>{modelLoaded ? '模型已加载，可以开始对话' : '演示模式 - 模拟AI响应'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="chat-container">
        <div className="container">
          <div className="chat-wrapper">
            {/* Messages */}
            <div className="messages-area">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.role}`}
                >
                  <div className="message-avatar">
                    {message.role === 'user' ? (
                      <div className="avatar user">
                        <User size={18} />
                      </div>
                    ) : (
                      <div className="avatar assistant">
                        <Bot size={18} />
                      </div>
                    )}
                  </div>
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-role">
                        {message.role === 'user' ? '你' : 'AI助手'}
                      </span>
                      <span className="message-time">
                        {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="message-text">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="message assistant loading">
                  <div className="message-avatar">
                    <div className="avatar assistant">
                      <Bot size={18} />
                    </div>
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="input-area">
              <div className="input-toolbar">
                <button className="toolbar-btn" onClick={clearChat} title="清空对话">
                  <Trash2 size={16} />
                  <span>清空</span>
                </button>
                <button className="toolbar-btn" onClick={exportChat} title="导出对话">
                  <Download size={16} />
                  <span>导出</span>
                </button>
              </div>
              
              <div className="input-box">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入消息..."
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  className={`send-btn ${input.trim() ? 'active' : ''}`}
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                >
                  <Send size={18} />
                </button>
              </div>
              
              <div className="input-hint">
                <AlertCircle size={14} />
                <span>按 Enter 发送，Shift + Enter 换行</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
