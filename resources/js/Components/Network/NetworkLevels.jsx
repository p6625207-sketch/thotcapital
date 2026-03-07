import { useState } from "react";
import NetworkLevelItem from "./NetworkLevelItem";

export default function NetworkLevels({ levelsData, colors }) {
    const [expandedLevel, setExpandedLevel] = useState(null);

    return (
        <div className="flex flex-col items-center gap-2  w-full mb-10 md:mb-16 px-1">
            {levelsData.map((level, index) => {
                const color = colors[index] || colors[colors.length - 1];
                
              
                const widthPct = Math.min(100, 35 + (index * 50));

                return (
                    <NetworkLevelItem
                        key={level.nivel}
                        level={level}
                        index={index}
                        color={color}
                        widthPct={widthPct}
                        expandedLevel={expandedLevel}
                        setExpandedLevel={setExpandedLevel}
                    />
                );
            })}
        </div>
    );
}