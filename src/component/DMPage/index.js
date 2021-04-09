import React from 'react';
import Menu, { SubMenu, Item as MenuItem } from 'rc-menu';
import './index.scss';
import animate from 'css-animation';

const animation = {
    enter(node, done) {
        let height;
        return animate(node, 'rc-menu-collapse', {
            start() {
                height = node.offsetHeight;
                node.style.height = 0;
            },
            active() {
                node.style.height = `${height}px`;
            },
            end() {
                node.style.height = '';
                done();
            }
        });
    },

    appear() {
        return this.enter.apply(this, arguments);
    },

    leave(node, done) {
        return animate(node, 'rc-menu-collapse', {
            start() {
                node.style.height = `${node.offsetHeight}px`;
            },
            active() {
                node.style.height = 0;
            },
            end() {
                node.style.height = '';
                done();
            }
        });
    }
};

class DMPage extends React.Component {
    // eslint-disable-next-line react/state-in-constructor
    state = {
        openKeys: []
    };

    // eslint-disable-next-line class-methods-use-this
    onClick(info) {
        console.log('click ', info);
    }

    onOpenChange = openKeys => {
        console.log('onOpenChange', openKeys);
        this.setState({
            openKeys
        });
    };

    getMenu() {
        return (
            <Menu
                motion={animation}
                className="rc-menu-container"
                onClick={this.onClick}
                mode="inline"
                onOpenChange={this.onOpenChange}
                openKeys={this.state.openKeys}>
                <SubMenu key="1" title="submenu1">
                    <MenuItem key="1-1">item1-1</MenuItem>
                    <MenuItem key="1-2">item1-2</MenuItem>
                </SubMenu>
                <SubMenu key="2" title="submenu2">
                    <MenuItem key="2-1">item2-1</MenuItem>
                    <MenuItem key="2-2">item2-2</MenuItem>
                </SubMenu>
                <MenuItem key="3">item3</MenuItem>
            </Menu>
        );
    }

    render() {
        return <div className="rc-menu-wrapper">{this.getMenu()}</div>;
    }
}

export default DMPage;
