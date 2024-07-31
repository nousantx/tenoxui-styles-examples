/*!
 * tenoxui/css v0.11.2
 * Licensed under MIT (https://github.com/tenoxui/css/blob/main/LICENSE)
 */
class makeTenoxUI{constructor({element:element,property:property={},values:values={},breakpoint:breakpoint=[],classes:classes={}}){this.htmlElement=element instanceof HTMLElement?element:element[0];this.styleAttribute=property;this.valueRegistry=values;this.breakpoints=breakpoint;this.classes=classes;this.scanAndApplyStyles();this.setupClassObserver()}scanAndApplyStyles(){const classes=this.htmlElement.className.split(/\s+/);classes.forEach((className=>{if(className){this.applyStyles(className)}}))}updateStyles(){this.htmlElement.style.cssText="";this.scanAndApplyStyles()}setupClassObserver(){const observer=new MutationObserver((mutations=>{mutations.forEach((mutation=>{if(mutation.type==="attributes"&&mutation.attributeName==="class"){this.updateStyles()}}))}));observer.observe(this.htmlElement,{attributes:true,attributeFilter:["class"]})}valueHandler(type,value,unit){const registryValue=this.valueRegistry[value];const properties=this.styleAttribute[type];let resolvedValue=registryValue||value;if(typeof properties==="object"&&"value"in properties&&!properties.value.includes("{value}")){return properties.value}else if(resolvedValue.startsWith("$")){return`var(--${resolvedValue.slice(1)})`}else if(resolvedValue.startsWith("[")&&resolvedValue.endsWith("]")){const solidValue=resolvedValue.slice(1,-1).replace(/\\_/g," ");return solidValue.startsWith("--")?`var(${solidValue})`:solidValue}const typeRegistry=this.valueRegistry[type];if(typeof typeRegistry==="object"){resolvedValue=typeRegistry[value]||resolvedValue}return resolvedValue+unit}setCssVar(variable,value){this.htmlElement.style.setProperty(variable,value)}setCustomValue(properties,resolvedValue){const{property:property,value:value}=properties;let finalValue=resolvedValue;if(value){finalValue=value.replace(/{value}/g,resolvedValue)}if(typeof property==="string"){if(property.startsWith("--")){this.setCssVar(property,finalValue)}else{this.htmlElement.style[property]=finalValue}}else if(Array.isArray(property)){property.forEach((prop=>{if(typeof prop==="string"&&prop.startsWith("--")){this.setCssVar(prop,finalValue)}else{this.htmlElement.style[prop]=finalValue}}))}}setDefaultValue(properties,resolvedValue){const propsArray=Array.isArray(properties)?properties:[properties];propsArray.forEach((property=>{if(typeof property==="string"&&property.startsWith("--")){this.setCssVar(property,resolvedValue)}else{this.htmlElement.style[property]=resolvedValue}}))}setCustomClass(propKey,value){if(propKey.startsWith("--")){this.setCssVar(propKey,value)}else{this.htmlElement.style[propKey]=value}}matchBreakpoint(bp,prefix,width){if(bp.name!==prefix)return false;if(bp.min!==undefined&&bp.max!==undefined){return width>=bp.min&&width<=bp.max}if(bp.min!==undefined)return width>=bp.min;if(bp.max!==undefined)return width<=bp.max;return false}camelToKebab(str){return str.replace(/[A-Z]/g,(match=>`-${match.toLowerCase()}`))}handleResponsive(breakpointPrefix,type,value,unit,propKey){const properties=this.styleAttribute[type];const handleResize=()=>{const windowWidth=window.innerWidth;const matchPoint=this.breakpoints.find((bp=>this.matchBreakpoint(bp,breakpointPrefix,windowWidth)));if(matchPoint){if(this.isObjectWithValue(properties)){this.addStyle(type)}else if(propKey&&this.classes[propKey]){this.addStyle(type,value,unit,propKey)}else{this.addStyle(type,value,unit)}}else{this.htmlElement.style[type]=""}};handleResize();window.addEventListener("resize",handleResize)}getPropName(type,propKey){var _a;if(type.startsWith("[--")&&type.endsWith("]")){return type.slice(1,-1)}const property=((_a=this.styleAttribute[type])===null||_a===void 0?void 0:_a.property)||this.styleAttribute[type];if(propKey&&this.classes[propKey]){return this.camelToKebab(propKey)}else if(Array.isArray(property)){return property.map(this.camelToKebab)}else if(property){return this.camelToKebab(property)}else{return undefined}}getInitialValue(propsName){if(Array.isArray(propsName)){return propsName.reduce(((acc,propName)=>{acc[propName]=this.htmlElement.style.getPropertyValue(propName);return acc}),{})}return this.htmlElement.style.getPropertyValue(propsName)}revertStyle(propsName,styleInitValue){if(Array.isArray(propsName)){propsName.forEach((propName=>{this.setCssVar(propName,styleInitValue[propName])}))}else{this.setCssVar(propsName,styleInitValue)}}pseudoHandler(type,value,unit,pseudoEvent,revertEvent,propKey){const properties=this.styleAttribute[type];const propsName=propKey?this.getPropName("",propKey):this.getPropName(type);const styleInitValue=this.getInitialValue(propsName);const applyStyle=()=>{if(this.isObjectWithValue(properties)){if(properties.value.includes("{value}")){this.addStyle(type,value,unit)}else{this.addStyle(type)}}else if(propKey&&this.classes[propKey][type]){this.addStyle(type,value,"",propKey)}else{this.addStyle(type,value,unit)}};const revertStyle=()=>this.revertStyle(propsName,styleInitValue);this.htmlElement.addEventListener(pseudoEvent,applyStyle);this.htmlElement.addEventListener(revertEvent,revertStyle)}addStyle(type,value,unit,classProp){const properties=this.styleAttribute[type];const definedClass=this.classes;if(definedClass[classProp]){this.setCustomClass(classProp,value);return}if(!value&&this.isObjectWithValue(properties)){value=properties.value}if(!value)return;let resolvedValue=this.valueHandler(type,value,unit||"");if(properties==="transition"||properties==="transitionDuration"){this.htmlElement.style.transition="none";this.htmlElement.style.transitionDuration="0s";void this.htmlElement.offsetHeight;requestAnimationFrame((()=>{this.htmlElement.style.transition="";this.htmlElement.style.transitionDuration="";void this.htmlElement.offsetHeight;if(properties==="transition"){this.htmlElement.style.transition=resolvedValue}else{this.htmlElement.style.transitionDuration=resolvedValue}}));return}if(type.startsWith("[--")&&type.endsWith("]")){this.setCssVar(type.slice(1,-1),resolvedValue)}else if(typeof properties==="object"&&"property"in properties){this.setCustomValue(properties,resolvedValue)}else if(properties){this.setDefaultValue(properties,resolvedValue)}}parseClassName(className){const match=className.match(/(?:([a-zA-Z0-9-]+):)?(-?[a-zA-Z0-9_]+(?:-[a-zA-Z0-9_]+)*|\[--[a-zA-Z0-9_-]+\])-(-?(?:\d+(\.\d+)?)|(?:[a-zA-Z0-9_]+(?:-[a-zA-Z0-9_]+)*(?:-[a-zA-Z0-9_]+)*)|(?:#[0-9a-fA-F]+)|(?:\[[^\]]+\])|(?:\$[^\s]+))([a-zA-Z%]*)/);if(!match)return null;const[,prefix,type,value,,unit]=match;return[prefix,type,value,unit]}getParentClass(className){const classObject=this.classes;const matchingProperties=[];for(const cssProperty in classObject){if(classObject[cssProperty].hasOwnProperty(className)){matchingProperties.push(cssProperty)}}return matchingProperties}isObjectWithValue(typeAttribute){return typeof typeAttribute==="object"&&typeAttribute!==null&&"value"in typeAttribute&&"property"in typeAttribute}parseDefaultStyle(prefix,type,value,unit){if(prefix){this.applyPrefixedStyle(prefix,type,value,unit)}else{this.addStyle(type,value,unit)}}applyPrefixedStyle(prefix,type,value,unit,propKey){switch(prefix){case"hover":this.pseudoHandler(type,value,unit,"mouseover","mouseout",propKey);break;case"focus":this.pseudoHandler(type,value,unit,"focus","blur",propKey);break;default:this.handleResponsive(prefix,type,value,unit,propKey)}}handlePredefinedStyle(type,prefix){const properties=this.styleAttribute[type];if(properties&&this.isObjectWithValue(properties)){const value=properties.value;if(prefix){this.applyPrefixedStyle(prefix,type,value,"")}else{this.addStyle(type)}return true}return false}handleCustomClass(type,prefix){const propKeys=this.getParentClass(type);if(propKeys.length>0){propKeys.forEach((propKey=>{const value=this.classes[propKey][type];if(prefix){this.applyPrefixedStyle(prefix,type,value,"",propKey)}else{this.addStyle(type,value,"",propKey)}return true}))}return false}applyStyles(className){const[prefix,type]=className.split(":");const getType=type||prefix;const getPrefix=type?prefix:undefined;if(this.handlePredefinedStyle(getType,getPrefix))return;if(this.handleCustomClass(getType,getPrefix))return;const parts=this.parseClassName(className);if(!parts)return;const[parsedPrefix,parsedType,value,unit]=parts;this.parseDefaultStyle(parsedPrefix,parsedType,value,unit)}applyMultiStyles(styles){styles.split(/\s+/).forEach((style=>this.applyStyles(style)))}}let allProps;let breakpoints=[];let globalValues={};let globalClass={};function makeStyle(selector,styles){const applyStylesToElement=(element,styles)=>{const styler=new makeTenoxUI({element:element,property:allProps,values:globalValues,classes:globalClass,breakpoint:breakpoints});styler.applyMultiStyles(styles)};const elements=document.querySelectorAll(selector);elements.forEach((element=>applyStylesToElement(element,styles)))}function makeStyles(...stylesObjects){let storedStyles={};let styleRegistry={};const applyStylesToElement=(element,styles)=>{const styler=new makeTenoxUI({element:element,property:allProps,values:globalValues,classes:globalClass,breakpoint:breakpoints});if(typeof styles==="string"){styler.applyMultiStyles(styles)}else{Object.entries(styles).forEach((([prop,value])=>{styler.addStyle(prop,value,"")}))}};const applyNestedStyles=(parentSelector,styles)=>{Object.entries(styles).forEach((([childSelector,childStyle])=>{let elementClass=`${parentSelector} ${childSelector}`.trim();let elements=document.querySelectorAll(elementClass);if(typeof childStyle==="object"&&!Array.isArray(childStyle)){applyNestedStyles(elementClass,childStyle)}else{elements.forEach((element=>{if(typeof childStyle==="string"){let styleArray=childStyle.split(" ");let styleResolve=styleArray.map((style=>styleRegistry[style]?styleRegistry[style].join(" "):style)).join(" ");applyStylesToElement(element,styleResolve)}else if(typeof childStyle==="object"&&!Array.isArray(childStyle)){applyStylesToElement(element,childStyle)}else{console.warn("Invalid nested style for:",childStyle)}}))}}))};stylesObjects.forEach((styleObject=>{Object.entries(styleObject).forEach((([selector,styles])=>{if(typeof styles==="string"){const styleArray=styles.split(" ");styleRegistry[selector]=styleArray;storedStyles[selector]=styles}else{storedStyles[selector]=styles}const elements=document.querySelectorAll(selector);elements.forEach((element=>{if(typeof styles==="string"){let styleArray=styles.split(" ");let styleResolve=styleArray.map((style=>styleRegistry[style]?styleRegistry[style].join(" "):style)).join(" ");applyStylesToElement(element,styleResolve)}else if(typeof styles==="object"&&!Array.isArray(styles)){applyStylesToElement(element,styles)}else{console.warn("Invalid styles type:",styles)}}));if(typeof styles==="object"&&!Array.isArray(styles)){applyNestedStyles(selector,styles)}}))}));return storedStyles}function use(customConfig){if(customConfig.breakpoint){breakpoints=[...breakpoints,...customConfig.breakpoint]}if(customConfig.property){allProps=Object.assign(Object.assign({},allProps),Object.assign({},...customConfig.property))}if(customConfig.values){globalValues=customConfig.values}if(customConfig.classes){globalClass=customConfig.classes}}function tenoxui(...customPropsArray){let objectProps=Object.assign({},allProps,...customPropsArray);allProps=objectProps;let classes=Object.keys(allProps).map((className=>`[class*="${className}"]`));let allClasses=document.querySelectorAll(classes.join(", "));allClasses.forEach((element=>{let htmlElement=element;let elementClassList=htmlElement.classList;const styler=new makeTenoxUI({element:htmlElement,property:allProps,values:globalValues,classes:globalClass,breakpoint:breakpoints});elementClassList.forEach((className=>{styler.applyStyles(className)}))}))}