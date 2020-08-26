import React, { useState, useCallback, useEffect } from 'react';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import { ShopUIInterface } from '../../modules/detail';
import Button from '../../components/common/Button';
import ButtonGroup from '../../components/common/ButtonGroup';
import axios from 'axios';
import { apiLink } from '../../lib/getAPILink';
import { AdminElementInterface } from './AdminDetail';

const MenuContainer = styled.div`
  .menu {
    display: flex;
    align-items: center;
    flex-direction: column;
    color: black;
    div {
      flex: 1;
      margin-top: 10px;
      span {
        margin-right: 10px;
      }
    }
  }
`;

interface AdminMenuInformationProps extends AdminElementInterface {
  shop: ShopUIInterface;
}

function AdminMenuInformation({ shop, reload, confirmAlert }: AdminMenuInformationProps) {
  interface Menu {
    title: string;
    price: number;
    _id: string;
  }

  const [menus, setMenus] = useState<Menu[]>([]);

  const [newMenu, setNewMenu] = useState<Menu>({
    title: '',
    price: 0,
    _id: '',
  });

  useEffect(() => {
    setMenus(shop.menus);
  }, [shop]);

  const onMenuChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, menuIndex: number) => {
      setMenus(
        menus.map((menu, index) =>
          index === menuIndex
            ? {
                ...menu,
                [event.target.name]: event.target.value,
              }
            : menu,
        ),
      );
    },
    [menus],
  );

  const updateMenu = async (menuId: string, index: number) => {
    if (!menus[index]) return;
    if (!confirmAlert()) return;
    await axios.put(
      `${apiLink()}/shop/menu/${menuId}`,
      { title: menus[index].title, price: menus[index].price },
      {
        withCredentials: true,
      },
    );
    reload();
  };

  const deleteMenu = async (menuId: string) => {
    if (!confirmAlert()) return;
    await axios.delete(`${apiLink()}/shop/menu/${menuId}`, {
      withCredentials: true,
    });
    reload();
  };

  const onNewMenuChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewMenu({
        ...newMenu,
        [event.target.name]: event.target.value,
      });
    },
    [newMenu],
  );

  const addNewMenu = async () => {
    if (!confirmAlert()) return;
    await axios.post(
      `${apiLink()}/shop/menu/${shop._id}`,
      {
        title: newMenu.title,
        price: newMenu.price,
      },
      {
        withCredentials: true,
      },
    );
    reload();
  };

  return (
    <MenuContainer>
      {shop.menus.map((menu, index) => (
        <div className="menu" key={menu._id}>
          {menus.length > 0 && (
            <>
              <div>
                <div>
                  <span>이름</span>
                  <input
                    name="title"
                    value={menus[index].title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onMenuChange(event, index)}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <span>가격</span>
                  <input
                    name="price"
                    value={menus[index].price}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onMenuChange(event, index)}
                    autoComplete="off"
                  />
                </div>
              </div>
              <ButtonGroup direction="row" gap="10px">
                <Button theme="red" onClick={() => updateMenu(menu._id, index)}>
                  수정
                </Button>
                <Button theme="red" onClick={() => deleteMenu(menu._id)}>
                  삭제
                </Button>
              </ButtonGroup>
            </>
          )}
        </div>
      ))}
      {shop.menus.length < 3 && (
        <div className="menu">
          {
            <>
              <div>
                <div>
                  <span>이름</span>
                  <input name="title" value={newMenu.title} onChange={onNewMenuChange} autoComplete="off" />
                </div>
                <div>
                  <span>가격</span>
                  <input name="price" value={newMenu.price} onChange={onNewMenuChange} autoComplete="off" />
                </div>
              </div>
              <ButtonGroup direction="row" gap="10px">
                <Button theme="red" onClick={addNewMenu}>
                  추가
                </Button>
              </ButtonGroup>
            </>
          }
        </div>
      )}
    </MenuContainer>
  );
}

export default AdminMenuInformation;
