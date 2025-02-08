interface AttributeProps {
  key: number;
  traitType: string;
  value: string;
}

// 属性名の翻訳マッピング
const attributeTranslations: { [key: string]: string } = {
  TokenType: 'トークンタイプ',
  Issuer: '発行者',
  Project: 'プロジェクト',
};

export function Attribute({ traitType, value }: AttributeProps) {
  const translatedTraitType = attributeTranslations[traitType] || traitType;

  return (
    <div className='flex items-center gap-2 bg-lightGray rounded-full px-2'>
      <span className='text-xs'>
        {translatedTraitType} : {value}
      </span>
    </div>
  );
}
