import React, { useState } from 'react';
import { USER_PERSONAS } from '../../data/researchData';
import { UserPersona } from '../../types';
import { User, Target, Flame, AlertCircle } from 'lucide-react';

export const UserPainPoints: React.FC = () => {
  const [activePersona, setActivePersona] = useState<UserPersona>(USER_PERSONAS[0]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
          核心用户画像、JTBD (待办任务) 与深度痛点溯源
        </h2>
        <p className="text-sm text-[#6C736E] dark:text-[#9BA39D] mt-1">
          直击高压都市职场人、泛灵性探索者 (SBNR) 与传统虔诚修习者的精神深水区。
        </p>
      </div>

      {/* Personas Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {USER_PERSONAS.map((persona) => {
          const isSelected = activePersona.id === persona.id;
          return (
            <div
              key={persona.id}
              onClick={() => setActivePersona(persona)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                isSelected
                  ? 'bg-[#EEF3EF]/60 dark:bg-[#1A241C] border-[#4A5D4E] shadow-xs ring-1 ring-[#4A5D4E]/40'
                  : 'bg-[#FFFFFF] dark:bg-[#1D221F] border-[#E5E1D8] dark:border-[#2D3530] hover:border-[#4A5D4E]/50 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold border transition-colors ${
                    isSelected
                      ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]'
                      : 'bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D] border-[#E5E1D8] dark:border-[#2D3530]'
                  }`}
                >
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#242926] dark:text-[#EDEFEA]">
                    {persona.name}
                  </h3>
                  <span className="text-xs text-[#6C736E] dark:text-[#9BA39D]">{persona.role}</span>
                </div>
              </div>

              <p className="text-xs text-[#6C736E] dark:text-[#9BA39D] line-clamp-2 mt-2 leading-relaxed">
                {persona.scenario}
              </p>
            </div>
          );
        })}
      </div>

      {/* Selected Persona Deep Dive */}
      {activePersona && (
        <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E1D8] dark:border-[#2D3530] gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs rounded-full bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D] font-medium">
                  {activePersona.role}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
                  {activePersona.name}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6C736E] dark:text-[#9BA39D] mt-1">
                生活场景还原：{activePersona.scenario}
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {activePersona.emotionalTriggers.map((trig, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl text-xs bg-[#FAF8F5] dark:bg-[#181C19] text-[#A84848] dark:text-[#E07A7A] border border-[#E5E1D8] dark:border-[#2D3530] flex items-center gap-1"
                >
                  <Flame className="w-3 h-3 text-[#D4AF37]" />
                  {trig}
                </span>
              ))}
            </div>
          </div>

          {/* JTBD & Pain Points Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* JTBD */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#D5E0D7] dark:border-[#29382D]">
              <h4 className="text-sm font-serif font-bold text-[#354338] dark:text-[#A3B8A7] flex items-center gap-2 mb-3">
                <Target className="w-4 h-4 text-[#4A5D4E] dark:text-[#D4AF37]" />
                核心待办任务 (Jobs To Be Done - JTBD)
              </h4>
              <p className="text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] leading-relaxed">
                “{activePersona.jtbd}”
              </p>
              <div className="mt-4 pt-4 border-t border-[#E5E1D8] dark:border-[#2D3530] text-xs text-[#6C736E] dark:text-[#9BA39D]">
                <strong className="text-[#4A5D4E] dark:text-[#D4AF37]">💡 本质心理诉求：</strong>
                用户真正买单的不是经文文本或AI算法，而是在极度脆弱、焦虑的瞬间，获得一份即刻的被接纳感、确定性与终极心性平静。
              </div>
            </div>

            {/* Pain points */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530]">
              <h4 className="text-sm font-serif font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-[#A84848] dark:text-[#E07A7A]" />
                最深刺痛与市面方案失效原因
              </h4>
              <ul className="space-y-2.5">
                {activePersona.painPoints.map((pain, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] flex items-start gap-2 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
