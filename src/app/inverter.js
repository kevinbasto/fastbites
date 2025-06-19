const fs = require('fs');
const path = require('path');

function findComponentFiles(dir, componentFiles = []) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // Recursivamente buscar en subdirectorios
            findComponentFiles(fullPath, componentFiles);
        } else if (file.endsWith('.component.ts')) {
            componentFiles.push(fullPath);
        }
    }
    
    return componentFiles;
}

function addStandaloneToComponent(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Regex para encontrar el decorador @Component con su objeto de configuración
        const componentRegex = /@Component\s*\(\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}\s*\)/s;
        const match = content.match(componentRegex);
        
        if (!match) {
            console.log(`❌ No se encontró decorador @Component en: ${filePath}`);
            return false;
        }
        
        const componentConfig = match[1];
        
        // Verificar si ya tiene standalone
        if (componentConfig.includes('standalone')) {
            console.log(`⚠️  Ya tiene standalone en: ${filePath}`);
            return false;
        }
        
        // Agregar standalone: true
        let newComponentConfig;
        const trimmedConfig = componentConfig.trim();
        
        if (trimmedConfig === '') {
            // Si el objeto está vacío
            newComponentConfig = '\n  standalone: false\n';
        } else {
            // Si ya tiene propiedades, agregar standalone al final
            if (trimmedConfig.endsWith(',')) {
                newComponentConfig = componentConfig + '\n  standalone: false';
            } else {
                newComponentConfig = componentConfig + ',\n  standalone: false';
            }
        }
        
        // Reemplazar el contenido del decorador
        const newContent = content.replace(
            componentRegex,
            `@Component({${newComponentConfig}})` 
        );
        
        // Escribir el archivo actualizado
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Actualizado: ${filePath}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error procesando ${filePath}:`, error.message);
        return false;
    }
}

function main() {
    console.log('🔍 Buscando archivos .component.ts...\n');
    
    // Obtener el directorio actual donde se ejecuta el script
    const currentDir = process.cwd();
    
    // Encontrar todos los archivos .component.ts
    const componentFiles = findComponentFiles(currentDir);
    
    if (componentFiles.length === 0) {
        console.log('❌ No se encontraron archivos .component.ts');
        return;
    }
    
    console.log(`📁 Encontrados ${componentFiles.length} archivos .component.ts:\n`);
    
    let processedCount = 0;
    let updatedCount = 0;
    
    // Procesar cada archivo
    for (const file of componentFiles) {
        console.log(`📝 Procesando: ${path.relative(currentDir, file)}`);
        processedCount++;
        
        if (addStandaloneToComponent(file)) {
            updatedCount++;
        }
        
        console.log(''); // Línea en blanco para separar
    }
    
    console.log('🎉 Proceso completado!');
    console.log(`📊 Resumen:`);
    console.log(`   - Archivos procesados: ${processedCount}`);
    console.log(`   - Archivos actualizados: ${updatedCount}`);
    console.log(`   - Archivos sin cambios: ${processedCount - updatedCount}`);
}

// Ejecutar el script
main();