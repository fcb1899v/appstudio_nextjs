import type { NextPage } from 'next'
import Image from 'next/image'
import { CSSProperties } from 'react'
import { isPC, myApp, myAppNumber } from '@/utils/constants'

interface Props {
  appNumber: number
  width: number
  isJa: boolean
}

/**
 * Component for displaying enhanced features of the app
 * Shows advanced or premium features with descriptions
 * @param features - Array of enhanced feature objects
 */
const EnhancedFeatures: NextPage<Props> = ({appNumber, width, isJa}) => {
  // Detailed feature data per app
  const getDetailedFeatures = () => {
    const features = {
      [myAppNumber.elevator]: [
        {
          icon: "🚀",
          title: isJa ? "1000ボタンモード" : "1000 Buttons Mode",
          description: isJa ? "1000個のボタンでエレベーターを操作！子供の想像力を無限に広げます。" : "Operate the elevator with 1000 buttons! Expand children's imagination infinitely.",
          image: "/images/elevator/features/1000buttons.png"
        },
        {
          icon: "🎵",
          title: isJa ? "リアルな音響効果" : "Realistic Sound Effects",
          description: isJa ? "本物のエレベーターと同じ音を再現。臨場感たっぷりの体験を提供します。" : "Reproduces the same sounds as real elevators. Provides an immersive experience.",
          image: "/images/elevator/features/sound.png"
        },
        {
          icon: "🎮",
          title: isJa ? "30秒チャレンジ" : "30 Second Challenge",
          description: isJa ? "制限時間内にエレベーターを操作するスリリングなゲームモード。" : "Thrilling game mode to operate the elevator within time limits.",
          image: "/images/elevator/features/challenge.png"
        }
      ],
      [myAppNumber.elevatorNeo]: [
        {
          icon: "🤖",
          title: isJa ? "生成AI技術" : "Generative AI Technology",
          description: isJa ? "最新の生成AIで作成された超リアルなエレベーター体験。" : "Ultra-realistic elevator experience created with cutting-edge generative AI.",
          image: "/images/elevatorneo/features/ai.png"
        },
        {
          icon: "🎨",
          title: isJa ? "カスタマイズ機能" : "Customization Features",
          description: isJa ? "エレベーターマイルを貯めて、階数と画像を自由にカスタマイズ。" : "Save elevator miles and freely customize floors and images.",
          image: "/images/elevatorneo/features/customize.png"
        },
        {
          icon: "🌟",
          title: isJa ? "進化したグラフィック" : "Enhanced Graphics",
          description: isJa ? "より美しく、よりリアルなグラフィックで没入感を向上。" : "Enhanced immersion with more beautiful and realistic graphics.",
          image: "/images/elevatorneo/features/graphics.png"
        }
      ],
      [myAppNumber.crossing]: [
        {
          icon: "🌍",
          title: isJa ? "4カ国の踏切" : "4 Countries' Crossings",
          description: isJa ? "日本、アメリカ、イギリス、ドイツの踏切を無料で体験できます。" : "Experience crossings from Japan, USA, UK, and Germany for free.",
          image: "/images/crossing/features/countries.png"
        },
        {
          icon: "📸",
          title: isJa ? "AI撮り鉄体験" : "AI Train Photography",
          description: isJa ? "リアルなAI生成画像で撮り鉄体験。毎日1枚無料で提供。" : "Train photography experience with realistic AI-generated images. 1 free daily.",
          image: "/images/crossing/features/photography.png"
        },
        {
          icon: "🎯",
          title: isJa ? "追加チケット購入" : "Additional Tickets",
          description: isJa ? "より多くの撮影機会を購入可能。コレクションを充実させよう。" : "Purchase more photography opportunities. Enrich your collection.",
          image: "/images/crossing/features/tickets.png"
        }
      ],
      [myAppNumber.toilet]: [
        {
          icon: "🚽",
          title: isJa ? "リアルなトイレ体験" : "Realistic Toilet Experience",
          description: isJa ? "本物のトイレと同じ操作感。ボタン一つで全ての機能を操作。" : "Same operation feel as real toilets. Operate all functions with one button.",
          image: "/images/toilet/features/realistic.png"
        },
        {
          icon: "🔊",
          title: isJa ? "本物の音響" : "Authentic Sounds",
          description: isJa ? "実際のトイレと同じ音を再現。臨場感たっぷりの体験。" : "Reproduces the same sounds as real toilets. Immersive experience.",
          image: "/images/toilet/features/sounds.png"
        },
        {
          icon: "👶",
          title: isJa ? "子供に優しい" : "Kid-Friendly",
          description: isJa ? "子供でも簡単に操作できる直感的なインターフェース。" : "Intuitive interface that children can easily operate.",
          image: "/images/toilet/features/kid-friendly.png"
        }
      ],
      [myAppNumber.allowance]: [
        {
          icon: "💰",
          title: isJa ? "簡単おこづかい管理" : "Easy Allowance Management",
          description: isJa ? "おこづかいとおかいものを簡単に登録。視覚的に分かりやすい。" : "Easily register pocket money and expenses. Visually easy to understand.",
          image: "/images/allowance/features/management.png"
        },
        {
          icon: "☁️",
          title: isJa ? "データバックアップ" : "Data Backup",
          description: isJa ? "ログインすればデータを安全にバックアップ。複数デバイスで同期。" : "Safely backup data by logging in. Sync across multiple devices.",
          image: "/images/allowance/features/backup.png"
        },
        {
          icon: "🎨",
          title: isJa ? "かわいいデザイン" : "Cute Design",
          description: isJa ? "子供も大人も楽しめる、かわいいデザイン。" : "Cute design that both children and adults can enjoy.",
          image: "/images/allowance/features/design.png"
        }
      ],
      [myAppNumber.phonics]: [
        {
          icon: "📚",
          title: isJa ? "150単語以上" : "Over 150 Words",
          description: isJa ? "豊富な単語数でフォニックスの学習をサポート。" : "Support phonics learning with abundant vocabulary.",
          image: "/images/phonics/features/words.png"
        },
        {
          icon: "🎵",
          title: isJa ? "音声学習" : "Audio Learning",
          description: isJa ? "きいて学べる音声機能で、正しい発音を習得。" : "Learn correct pronunciation with audio learning features.",
          image: "/images/phonics/features/audio.png"
        },
        {
          icon: "🎨",
          title: isJa ? "かわいいイラスト" : "Cute Illustrations",
          description: isJa ? "子供が喜ぶかわいいイラストで楽しく学習。" : "Fun learning with cute illustrations that children love.",
          image: "/images/phonics/features/illustrations.png"
        }
      ],
      [myAppNumber.japanese]: [
        {
          icon: "あ",
          title: isJa ? "ひらがな・カタカナ" : "Hiragana & Katakana",
          description: isJa ? "ひらがなとカタカナの両方を楽しく学習。" : "Fun learning of both hiragana and katakana.",
          image: "/images/japanese/features/characters.png"
        },
        {
          icon: "📚",
          title: isJa ? "180単語以上" : "Over 180 Words",
          description: isJa ? "豊富な単語数で日本語学習をサポート。" : "Support Japanese learning with abundant vocabulary.",
          image: "/images/japanese/features/words.png"
        },
        {
          icon: "🎵",
          title: isJa ? "音声学習" : "Audio Learning",
          description: isJa ? "きいて学べる音声機能で、正しい発音を習得。" : "Learn correct pronunciation with audio learning features.",
          image: "/images/japanese/features/audio.png"
        }
      ]
    }
    
    return features[appNumber] || []
  }

  const features = getDetailedFeatures()
  
  if (features.length === 0) {
    return null
  }

  const containerStyle: CSSProperties = {
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    padding: '40px 20px',
    background: myApp(width, isJa)[appNumber].color.features,
  }

  const titleStyle: CSSProperties = {
    textAlign: 'center',
    fontSize: isPC(width) ? 32 : 24,
    fontWeight: 'bold',
    color: myApp(width, isJa)[appNumber].color.title,
    marginBottom: 40,
  }

  const featuresContainerStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isPC(width) ? 'repeat(auto-fit, minmax(350px, 1fr))' : '1fr',
    gap: 30,
    marginTop: 20,
  }

  const featureCardStyle: CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 30,
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    textAlign: 'center',
  }

  const iconStyle: CSSProperties = {
    fontSize: 48,
    marginBottom: 15,
  }

  const featureTitleStyle: CSSProperties = {
    fontSize: isPC(width) ? 20 : 18,
    fontWeight: 'bold',
    color: myApp(width, isJa)[appNumber].color.title,
    marginBottom: 15,
  }

  const featureDescriptionStyle: CSSProperties = {
    fontSize: isPC(width) ? 16 : 14,
    lineHeight: 1.6,
    color: myApp(width, isJa)[appNumber].color.message,
    marginBottom: 20,
  }

  const featureImageStyle: CSSProperties = {
    width: '100%',
    maxWidth: 200,
    maxHeight: 150,
    height: 'auto',
    objectFit: 'contain' as const,
    borderRadius: 10,
    margin: '0 auto',
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>
        {isJa ? '主要機能' : 'Key Features'}
      </h2>
      
      <div style={featuresContainerStyle}>
        {features.map((feature, index) => (
          <div 
            key={index} 
            style={featureCardStyle}
            className="hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            <div style={iconStyle}>
              {feature.icon}
            </div>
            <h3 style={featureTitleStyle}>
              {feature.title}
            </h3>
            <p style={featureDescriptionStyle}>
              {feature.description}
            </p>
            {feature.image && (
              <Image
                src={feature.image}
                alt={feature.title}
                width={200}
                height={150}
                priority={index === 0}
                style={featureImageStyle}
                className="hover:scale-110 transition-transform duration-300"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EnhancedFeatures 