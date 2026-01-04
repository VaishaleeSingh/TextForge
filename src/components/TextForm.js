import React, {useState, useEffect} from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function TextForm(props) {
    const theme = props.theme || { text: '#042743', background: 'white', surface: '#f8f9fa', border: '#ced4da', primary: '#0d6efd', success: '#198754', warning: '#ffc107', danger: '#dc3545', info: '#0dcaf0', secondary: '#6c757d' }
    const [text, setText] = useState('')
    const [findText, setFindText] = useState('')
    const [replaceText, setReplaceText] = useState('')
    const [showFindReplace, setShowFindReplace] = useState(false)
    const [wordFrequency, setWordFrequency] = useState({})

    useEffect(() => {
        if (text.length > 0) {
            const words = text.toLowerCase().match(/\b\w+\b/g) || []
            const frequency = {}
            words.forEach(word => {
                frequency[word] = (frequency[word] || 0) + 1
            })
            setWordFrequency(frequency)
        } else {
            setWordFrequency({})
        }
    }, [text])

    const handleUpclick = () => {
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to Upper Case", "success")
    }
    
    const handleLowclick = () => {
        let newText = text.toLowerCase();
        setText(newText)
        props.showAlert("Converted to Lower Case", "success")
    }

    const handleTitleCase = () => {
        let newText = text.toLowerCase().split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1)
        }).join(' ')
        setText(newText)
        props.showAlert("Converted to Title Case", "success")
    }

    const handleSentenceCase = () => {
        let newText = text.toLowerCase().split('. ').map(sentence => {
            return sentence.charAt(0).toUpperCase() + sentence.slice(1)
        }).join('. ')
        setText(newText)
        props.showAlert("Converted to Sentence Case", "success")
    }

    const handleCapitalizeFirst = () => {
        let newText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
        setText(newText)
        props.showAlert("Capitalized First Letter", "success")
    }

    const handleReverseText = () => {
        let newText = text.split('').reverse().join('')
        setText(newText)
        props.showAlert("Text Reversed", "success")
    }

    const handleToggleCase = () => {
        let newText = text.split('').map(char => {
            return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        }).join('')
        setText(newText)
        props.showAlert("Case Toggled", "success")
    }
    
    const handleClearclick = () => {
        setText('')
        setFindText('')
        setReplaceText('')
        props.showAlert("Text cleared", "success")
    }
    
    const handleCopyclick = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Text copied to clipboard", "success")
    }
    
    const handleRemoveSpaces = () => {
        let newText = text.split(/[ ]+/).join(" ");
        setText(newText)
        props.showAlert("Extra spaces removed", "success")
    }

    const handleFindReplace = () => {
        if (!findText) {
            props.showAlert("Please enter text to find", "warning")
            return
        }
        let newText = text.split(findText).join(replaceText)
        setText(newText)
        props.showAlert("Text replaced", "success")
    }

    const handleDownload = () => {
        const element = document.createElement("a")
        const file = new Blob([text], {type: 'text/plain'})
        element.href = URL.createObjectURL(file)
        element.download = "textforge-text.txt"
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
        props.showAlert("Text downloaded", "success")
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setText(e.target.result)
                props.showAlert("File uploaded successfully", "success")
            }
            reader.readAsText(file)
        }
    }

    const handleOnChange = (event) => {
        setText(event.target.value)
    }
    
    // Statistics Card Component
    const StatsCard = ({ theme, title, value, color, delay, subtitle }) => {
        const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
        const cardStyle = {
            backgroundColor: theme.surface,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            boxShadow: theme.mode === 'dark' 
                ? '0 2px 8px rgba(0,0,0,0.2)' 
                : '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        };
        
        return (
            <div
                ref={ref}
                className={`card h-100 card-zoom fade-in-up ${isVisible ? 'visible' : ''} stagger-${delay}`}
                style={cardStyle}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = theme.mode === 'dark'
                        ? '0 8px 24px rgba(0,0,0,0.4)'
                        : '0 8px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = theme.mode === 'dark'
                        ? '0 2px 8px rgba(0,0,0,0.2)'
                        : '0 2px 8px rgba(0,0,0,0.08)';
                }}
            >
                <div className="card-body text-center">
                    <h5 className="card-title">{title}</h5>
                    <h2 style={{color: color, fontSize: '2.5rem', fontWeight: 'bold'}}>{value}</h2>
                    {subtitle && <small style={{color: theme.textSecondary}}>{subtitle}</small>}
                </div>
            </div>
        );
    };

    const StatsSectionHeader = ({ theme }) => {
        const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
        return (
            <h2 
                ref={ref}
                className={`mb-3 fade-in ${isVisible ? 'visible' : ''}`}
                style={{transition: 'color 0.3s ease'}}
            >
                📊 Text Analytics
            </h2>
        );
    };
    
    const words = text.split(/\s+/).filter((element) => {return element.length !==0})
    const wordCount = words.length
    const charCount = text.length
    const charCountNoSpaces = text.replace(/\s/g, '').length
    const paragraphCount = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || (text.trim().length > 0 ? 1 : 0)
    const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    const topWords = Object.entries(wordFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)

    return (
        <>
        <div className="container" style={{color : theme.text}}>
            <h1 className="mb-3" style={{transition: 'color 0.3s ease'}}>{props.heading}</h1>
            
            {/* File Upload/Download Section */}
            <div className="mb-3 d-flex gap-2 flex-wrap">
                <label 
                    className="btn btn-outline-primary" 
                    style={{
                        borderColor: theme.primary,
                        color: theme.primary,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = theme.primary + '20'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent'
                    }}
                >
                    📁 Upload File
                    <input type="file" accept=".txt,.text" onChange={handleFileUpload} style={{display: 'none'}} />
                </label>
                <button 
                    disabled={text.length===0}
                    className="btn btn-outline-success"
                    onClick={handleDownload}
                    style={{
                        borderColor: theme.success,
                        color: theme.success,
                        transition: 'all 0.3s ease'
                    }}
                >
                    ⬇️ Download Text
                </button>
            </div>

            <div className="mb-3">
                <textarea 
                    className="form-control" 
                    value={text} 
                    onChange={handleOnChange} 
                    style={{
                        backgroundColor : theme.surface, 
                        color : theme.text,
                        border: `1px solid ${theme.border}`,
                        transition: 'all 0.3s ease',
                        fontSize: '16px',
                        lineHeight: '1.6'
                    }} 
                    id="myBox" 
                    rows="10"
                    placeholder="Enter your text here... Start typing or upload a file!"
                ></textarea>
            </div>

            {/* Find & Replace Toggle */}
            <div className="mb-3">
                <button
                    className="btn btn-outline-info"
                    onClick={() => setShowFindReplace(!showFindReplace)}
                    style={{
                        borderColor: theme.info,
                        color: theme.info,
                        transition: 'all 0.3s ease'
                    }}
                >
                    {showFindReplace ? '🔍 Hide Find & Replace' : '🔍 Show Find & Replace'}
                </button>
            </div>

            {/* Find & Replace Panel */}
            {showFindReplace && (
                <div 
                    className="mb-3 p-3 rounded" 
                    style={{
                        backgroundColor: theme.surface,
                        border: `1px solid ${theme.border}`,
                        transition: 'all 0.3s ease',
                        animation: 'slideDown 0.3s ease'
                    }}
                >
                    <div className="row g-2">
                        <div className="col-md-5">
                            <label className="form-label">Find:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={findText}
                                onChange={(e) => setFindText(e.target.value)}
                                placeholder="Text to find..."
                                style={{
                                    backgroundColor: theme.background,
                                    color: theme.text,
                                    border: `1px solid ${theme.border}`
                                }}
                            />
                        </div>
                        <div className="col-md-5">
                            <label className="form-label">Replace with:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={replaceText}
                                onChange={(e) => setReplaceText(e.target.value)}
                                placeholder="Replace with..."
                                style={{
                                    backgroundColor: theme.background,
                                    color: theme.text,
                                    border: `1px solid ${theme.border}`
                                }}
                            />
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                            <button
                                disabled={text.length===0 || !findText}
                                className="btn btn-info w-100"
                                onClick={handleFindReplace}
                                style={{
                                    backgroundColor: theme.info,
                                    borderColor: theme.info
                                }}
                            >
                                Replace
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Text Transformation Buttons */}
            <div className="mb-3">
                <h5 className="mb-2">Case Transformations:</h5>
                <div className="d-flex flex-wrap gap-2">
                    <button 
                        disabled={text.length===0}
                        className="btn btn-primary" 
                        onClick={handleUpclick}
                        style={{
                            backgroundColor: theme.primary,
                            borderColor: theme.primary,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        UPPERCASE
                    </button>
                    
                    <button 
                        disabled={text.length===0}
                        className="btn btn-primary" 
                        onClick={handleLowclick}
                        style={{
                            backgroundColor: theme.primary,
                            borderColor: theme.primary,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        lowercase
                    </button>
                    
                    <button 
                        disabled={text.length===0}
                        className="btn btn-primary" 
                        onClick={handleTitleCase}
                        style={{
                            backgroundColor: theme.primary,
                            borderColor: theme.primary,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Title Case
                    </button>
                    
                    <button 
                        disabled={text.length===0}
                        className="btn btn-primary" 
                        onClick={handleSentenceCase}
                        style={{
                            backgroundColor: theme.primary,
                            borderColor: theme.primary,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Sentence case
                    </button>
                    
                    <button 
                        disabled={text.length===0}
                        className="btn btn-primary" 
                        onClick={handleCapitalizeFirst}
                        style={{
                            backgroundColor: theme.primary,
                            borderColor: theme.primary,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Capitalize First
                    </button>
                    
                    <button 
                        disabled={text.length===0}
                        className="btn btn-primary" 
                        onClick={handleToggleCase}
                        style={{
                            backgroundColor: theme.primary,
                            borderColor: theme.primary,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        tOGGLE cASE
                    </button>
                    
                    <button 
                        disabled={text.length===0}
                        className="btn btn-secondary" 
                        onClick={handleReverseText}
                        style={{
                            backgroundColor: theme.secondary,
                            borderColor: theme.secondary,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        ↻ Reverse Text
                    </button>
                </div>
            </div>

            {/* Utility Buttons */}
            <div className="mb-3">
                <h5 className="mb-2">Utilities:</h5>
                <div className="d-flex flex-wrap gap-2">
                    <button 
                        disabled={text.length===0}
                        className="btn btn-success" 
                        onClick={handleCopyclick}
                        style={{
                            backgroundColor: theme.success,
                            borderColor: theme.success,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        📋 Copy Text
                    </button>
                    
                    <button 
                        disabled={text.length===0}
                        className="btn btn-warning" 
                        onClick={handleRemoveSpaces}
                        style={{
                            backgroundColor: theme.warning,
                            borderColor: theme.warning,
                            color: theme.mode === 'dark' ? 'white' : '#000',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        ✂️ Remove Extra Spaces
                    </button>
                    
                    <button 
                        disabled={text.length===0}
                        className="btn btn-danger" 
                        onClick={handleClearclick}
                        style={{
                            backgroundColor: theme.danger,
                            borderColor: theme.danger,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        🗑️ Clear Text
                    </button>
                </div>
            </div>
        </div>
        
        {/* Enhanced Statistics Section */}
        <div className="container my-4" style={{color : theme.text}}>
            <StatsSectionHeader theme={theme} />
            <div className="row g-3">
                <div className="col-md-3 col-sm-6">
                    <StatsCard 
                        theme={theme}
                        title="Words"
                        value={wordCount}
                        color={theme.primary}
                        delay={0}
                    />
                </div>
                <div className="col-md-3 col-sm-6">
                    <StatsCard 
                        theme={theme}
                        title="Characters"
                        value={charCount}
                        color={theme.info}
                        delay={1}
                        subtitle={`(${charCountNoSpaces} no spaces)`}
                    />
                </div>
                <div className="col-md-3 col-sm-6">
                    <StatsCard 
                        theme={theme}
                        title="Sentences"
                        value={sentenceCount}
                        color={theme.success}
                        delay={2}
                    />
                </div>
                <div className="col-md-3 col-sm-6">
                    <StatsCard 
                        theme={theme}
                        title="Paragraphs"
                        value={paragraphCount}
                        color={theme.warning}
                        delay={3}
                    />
                </div>
            </div>
            <div className="mt-3">
                <p className="mb-2"><strong>⏱️ Reading Time:</strong> {(0.008 * wordCount).toFixed(2)} minutes (average speed)</p>
            </div>

            {/* Word Frequency */}
            {topWords.length > 0 && (
                <div className="mt-4">
                    <h4>🔤 Most Frequent Words</h4>
                    <div className="d-flex flex-wrap gap-2 mt-2">
                        {topWords.map(([word, count]) => (
                            <span 
                                key={word}
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: theme.primary,
                                    fontSize: '14px',
                                    padding: '8px 12px',
                                    transition: 'transform 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                {word}: {count}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>

        {/* Preview Section */}
        <div className="container my-4" style={{color : theme.text}}>
            <h2 className="mb-3" style={{transition: 'color 0.3s ease'}}>👁️ Preview</h2>
            <div 
                className="p-3 rounded"
                style={{
                    backgroundColor: theme.surface,
                    border: `1px solid ${theme.border}`,
                    minHeight: '100px',
                    transition: 'all 0.3s ease'
                }}
            >
                <p style={{margin: 0, whiteSpace: 'pre-wrap'}}>
                    {text.length > 0 ? text : "Enter something in the textbox above to preview it here"}
                </p>
            </div>
        </div>

        <style>{`
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .btn:disabled {
                opacity: 0.5;
                cursor: not-allowed !important;
            }
            .btn:not(:disabled):hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
        `}</style>
        </>
    )
}