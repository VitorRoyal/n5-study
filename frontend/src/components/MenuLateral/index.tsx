import { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { caminhosIcones, gruposMenu, type ItemMenu, type NomeIcone } from "./itens";
import {
  EtiquetaEmBreve,
  Grupo,
  Icone,
  ItemBotao,
  ItemDesativado,
  ItemLink,
  Marca,
  Menu,
  NomeMarca,
  Selo,
  Seta,
  SubitemDesativado,
  SubitemLink,
  Submenu,
  TituloGrupo,
} from "./style";

interface IconeMenuProps {
  nome: NomeIcone;
}

function IconeMenu({ nome }: IconeMenuProps) {
  return (
    <Icone viewBox="0 0 24 24" aria-hidden="true">
      <path d={caminhosIcones[nome]} />
    </Icone>
  );
}

interface ItemSimplesProps {
  item: ItemMenu;
}

function ItemSimples({ item }: ItemSimplesProps) {
  if (item.rota === null) {
    return (
      <ItemDesativado aria-disabled="true">
        <IconeMenu nome={item.icone} />
        {item.rotulo}
        <EtiquetaEmBreve>em breve</EtiquetaEmBreve>
      </ItemDesativado>
    );
  }

  return (
    <ItemLink to={item.rota} end>
      <IconeMenu nome={item.icone} />
      {item.rotulo}
    </ItemLink>
  );
}

interface ItemComSubitensProps {
  item: ItemMenu;
}

function ItemComSubitens({ item }: ItemComSubitensProps) {
  const [aberto, setAberto] = useState(true);

  return (
    <>
      <ItemBotao type="button" aria-expanded={aberto} onClick={() => setAberto((atual) => !atual)}>
        <IconeMenu nome={item.icone} />
        {item.rotulo}
        <Seta $aberto={aberto} aria-hidden="true">
          &#9662;
        </Seta>
      </ItemBotao>
      {aberto && (
        <Submenu>
          {item.subitens?.map((subitem) =>
            subitem.rota === null ? (
              <SubitemDesativado key={subitem.rotulo} aria-disabled="true">
                {subitem.rotulo}
                <EtiquetaEmBreve>em breve</EtiquetaEmBreve>
              </SubitemDesativado>
            ) : (
              <SubitemLink key={subitem.rotulo} to={subitem.rota} end>
                {subitem.rotulo}
              </SubitemLink>
            )
          )}
        </Submenu>
      )}
    </>
  );
}

export function MenuLateral() {
  const { signOut } = useAuth();

  return (
    <Menu>
      <Marca>
        <Selo>字</Selo>
        <NomeMarca>Nihon GO</NomeMarca>
      </Marca>
      {gruposMenu.map((grupo) => (
        <Grupo key={grupo.titulo} aria-label={grupo.titulo}>
          <TituloGrupo>{grupo.titulo}</TituloGrupo>
          {grupo.itens.map((item) => {
            if (item.subitens !== undefined) {
              return <ItemComSubitens key={item.rotulo} item={item} />;
            }

            if (item.acao === "sair") {
              return (
                <ItemBotao key={item.rotulo} type="button" onClick={signOut}>
                  <IconeMenu nome={item.icone} />
                  {item.rotulo}
                </ItemBotao>
              );
            }

            return <ItemSimples key={item.rotulo} item={item} />;
          })}
        </Grupo>
      ))}
    </Menu>
  );
}
