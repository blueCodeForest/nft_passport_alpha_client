import generate from 'openapi-typescript';
import fs from 'fs';
import path from 'path';

async function generateTypeAliases(schema: any): Promise<string> {
  const types = Object.keys(schema.components?.schemas || {})
    .map((key) => `export type ${key} = components["schemas"]["${key}"];`)
    .join('\n');

  return `\n// Auto-generated type aliases
  export interface paths {
    [key: string]: any;
  }

  export interface components {
    schemas: {
      [key: string]: any;
    }
  }
${types}\n`;
}

async function main() {
  try {
    const swaggerUrl = 'http://localhost:3000/swagger.json';

    // 型定義を生成
    const output = JSON.stringify(await generate(swaggerUrl), null, 2);
    const schema = await fetch(swaggerUrl).then((res) => res.json());
    const typeAliases = await generateTypeAliases(schema);

    const outputPath = path.resolve(
      process.cwd(),
      'src/types/swagger-types.ts'
    );

    // 生成された型定義とエイリアスを結合
    const finalOutput = `${output}\n${typeAliases}`;

    await fs.promises.writeFile(outputPath, finalOutput, 'utf-8');
    console.log('✨ 型定義の生成が完了しました');
  } catch (error) {
    console.error('❌ エラー:', error);
    process.exit(1);
  }
}

main();
