'use client';

import {useEffect, useRef, useState} from 'react'
import {cn, configureAssistant, getSubjectColor} from "@/lib/utils";
import {vapi} from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import soundwaves from '@/constants/soundwaves.json'
import {addToSessionHistory} from "@/lib/actions/companion.actions";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const subjectColor = getSubjectColor(subject);

    useEffect(() => {
        if(lottieRef) {
            if(isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE)
        };

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            addToSessionHistory(companionId)
        }

        const onMessage = (message: Message) => {
            if(message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage= { role: message.role, content: message.transcript}
                setMessages((prev) => [newMessage, ...prev])
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log('Error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, []);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted)
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    return (
        <section className="flex flex-col h-[70vh]">
            <section className="flex gap-8 max-sm:flex-col">
                <div className="companion-section">
                    <div 
                        className="companion-avatar"
                        style={{ 
                            backgroundColor: `${subjectColor}12`,
                            boxShadow: callStatus === CallStatus.ACTIVE 
                                ? `0 0 40px ${subjectColor}25` 
                                : 'none',
                            transition: 'box-shadow 0.5s ease',
                        }}
                    >
                        <div
                            className={
                                cn(
                                    'absolute transition-opacity duration-1000', 
                                    callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0', 
                                    callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                                )
                            }>
                            <Image src={`/icons/${subject}.svg`} alt={subject} width={150} height={150} className="max-sm:w-fit brightness-110" />
                        </div>

                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100': 'opacity-0')}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="companion-lottie"
                            />
                        </div>
                    </div>
                    <p className="font-display font-bold text-2xl pb-4" style={{ color: 'var(--text-primary)' }}>{name}</p>
                </div>

                <div className="user-section">
                    <div className="user-avatar">
                        <Image src={userImage} alt={userName} width={130} height={130} className="rounded-xl" />
                        <p className="font-bold text-2xl" style={{ color: 'var(--text-primary)' }}>
                            {userName}
                        </p>
                    </div>
                    <button className="btn-mic" onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                        <Image 
                            src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} 
                            alt="mic" 
                            width={36} 
                            height={36} 
                            className="brightness-200"
                        />
                        <p className="max-sm:hidden text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                        </p>
                    </button>
                    <button 
                        className={cn(
                            'rounded-xl py-3 cursor-pointer transition-all duration-300 w-full font-semibold text-sm',
                            callStatus === CallStatus.CONNECTING && 'animate-pulse'
                        )}
                        style={{
                            background: callStatus === CallStatus.ACTIVE ? '#E54D4D' : 'var(--accent-gold)',
                            color: callStatus === CallStatus.ACTIVE ? '#fff' : 'var(--bg-deep)',
                            boxShadow: callStatus === CallStatus.ACTIVE 
                                ? '0 0 20px rgba(229, 77, 77, 0.3)' 
                                : '0 0 20px rgba(212, 168, 83, 0.2)',
                        }}
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                    >
                        {callStatus === CallStatus.ACTIVE
                            ? "End Session"
                            : callStatus === CallStatus.CONNECTING
                                ? 'Connecting...'
                                : 'Start Session'
                        }
                    </button>
                </div>
            </section>

            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if(message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-sm" style={{ color: 'var(--text-primary)' }}>
                                    <span className="font-display font-semibold" style={{ color: subjectColor }}>
                                        {name.split(' ')[0].replace('/[.,]/g, ', '')}:
                                    </span>{' '}
                                    {message.content}
                                </p>
                            )
                        } else {
                            return (
                                <p key={index} className="max-sm:text-sm" style={{ color: 'var(--text-primary)' }}>
                                    <span className="font-semibold" style={{ color: 'var(--accent-gold)' }}>
                                        {userName}:
                                    </span>{' '}
                                    {message.content}
                                </p>
                            )
                        }
                    })}
                </div>
            </section>
        </section>
    )
}

export default CompanionComponent
